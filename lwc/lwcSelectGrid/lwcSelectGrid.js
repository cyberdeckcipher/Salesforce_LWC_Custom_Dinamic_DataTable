import { api, track, LightningElement } from 'lwc';

export default class LwcSelectGrid extends LightningElement {
    @track datalist = null;
    selectedItems = [];
    gridMapObject = new Map();
    hideColunsList = [];

    @api
    get hideColuns() {
        return this.hideColunsList;
    }
    set hideColuns(data) {
        this.hideColunsList = data;
    }

    @api
    get gridData() {
        return this.datalist;
    }

    set gridData(data) {
        if (this.datalist == null)
            this.datalist = this.mapGridData(
                this.processGridData(data)
            );
    }

    mapGridData(data) {
        let gridData = {
            colunNames: null,
            colunValues: null
        }

        this.gridMapObject = new Map();
        let keylist = [];

        Object.keys(data[0].value).forEach(colunName => {
            if (!this.hideColuns.includes(colunName))
                keylist.push(colunName);
        });

        let fullHierarchyNames = [];
        let rowHierarchyValues = [];

        gridData.colunValues = data.map((rowValues, rowIndex)=>{
            let rowKey = 'GridRow-' + (rowIndex + 1);

            let row = keylist.map((cn, rowColunIndex)=>{
                let rowColunValue = rowValues.value[cn];

                return{
                    value: rowColunValue,
                    key: (rowColunValue + '-' + rowIndex + '-' + rowColunIndex)
                }
            });

            let hierarchy = {};
            hierarchy = rowValues.path.map((pathName, pathIndex)=>{
                let dinamicPropertyName = pathIndex == 0? 'Grupo' : ('Subgrupo'+(pathIndex == 1? '': ('-'+pathIndex)));
                if(!fullHierarchyNames.includes(dinamicPropertyName))
                    fullHierarchyNames.push(dinamicPropertyName);
                return{
                    [dinamicPropertyName]: pathName
                }
            });

            rowHierarchyValues.push([...hierarchy]);

            this.gridMapObject.set(rowKey, rowValues.value);

            return {
                valueList: row,
                key: rowKey,
                onClickEvent: () => { this.onSelectObject(rowValues.value); }
            }
        });

        keylist = [...fullHierarchyNames, ...keylist];

        gridData.colunNames = keylist.map((item, index) => {
            let keyvalue = 'gridColun-' + item + '-' + (index + 1);

            return {
                name: item,
                key: keyvalue,
            }
        });

        gridData.colunValues = gridData.colunValues.map( (gridRow, gridRowIndex) =>{
            let newValueListWithHierarchy = [];

            fullHierarchyNames.forEach((Hierarchyname, hierarchyIndex) =>{
                let newHierarchyValue = {
                    value: (rowHierarchyValues[gridRowIndex].length == 0 ? '-' : 
                            rowHierarchyValues[gridRowIndex].length <= hierarchyIndex ? '-' :
                            rowHierarchyValues[gridRowIndex][hierarchyIndex][Hierarchyname]),
                    key: ('hierarchy'+Hierarchyname+'-'+gridRowIndex+'-'+(hierarchyIndex+1))
                };

                newValueListWithHierarchy.push(newHierarchyValue);
            })

            newValueListWithHierarchy = [...newValueListWithHierarchy, ...gridRow.valueList];

            return{
                valueList: newValueListWithHierarchy,
                key: gridRow.key,
                onClickEvent: gridRow.onClickEvent
            }
        });

        return gridData;
    }

    getItemData(gridDataItem, colum) {
        return gridDataItem[colum];
    }

    processGridData(dataObject) {
        let response = [];

        if (dataObject == null || dataObject.length == 0) {
            console.log('Invalid grid data: ', dataObject);
            return null;
        }

        let processedTree = [];

        dataObject.forEach(treeTop => {
            if(treeTop._children == undefined
                || treeTop._children == null
                || treeTop._children.length == 0){
                
                response.push(this.getLeaf(treeTop,[]));
            }
            else{
                processedTree.push(this.recursiveStepTree(treeTop, []));
            }
        });


        processedTree.forEach(leafList => {
            leafList.forEach( leaf =>{
                response.push(leaf);
            });
        });

        return response;
    }

    recursiveStepTree(treeObject, upPath){
        let response = [];
        let childResponse = [];
        let nextUpPath = [...upPath, treeObject.accountName];

        treeObject._children.forEach(child =>{
            if(child._children == undefined
                || child._children == null
                || child._children.length == 0){
            
                response.push(this.getLeaf(child, nextUpPath));
            }
            else{
                childResponse = [...childResponse, ...this.recursiveStepTree(child, nextUpPath)];
            }
        });

        response = [...response, ...childResponse];

        return response;
    }

    getLeaf(treeObject, nextUpPath){
        let leaf ={
            value: null,
            path: []
        }

        leaf.value = {...treeObject};
        leaf.path = [...nextUpPath];

        return leaf;
    }

    recursiveGetLeafPath(treeObject, upPath) {
        let response = {
            treeLeafs: [],
            path: []
        }

        if (treeObject._children == undefined
            || treeObject._children == null
            || treeObject._children.length == 0) {
            response.treeLeafs.push(treeObject);
            response.path = [...upPath];

        } else {
            let childrenResponse = [];

            let childrenPath = [];
            childrenPath.push(treeObject.accountName);

            if (upPath != null) {
                childrenPath = [...upPath, ...childrenPath];
            }

            treeObject._children.forEach(e => {
                childrenResponse.push(this.recursiveGetLeafPath(e, childrenPath));
            });

            if (childrenResponse.length > 0)
                childrenResponse.forEach(cr => {
                    response.treeLeafs = [...response.treeLeafs, ...cr.treeLeafs];
                    response.path = [...cr.path];
                });
        }

        return response;
    }

    onSelectObject(obj) {
        if (this.selectedItems.includes(obj)) {
            let temp = [];
            this.selectedItems.forEach(item => { if (item != obj) temp.push(item); });
            this.selectedItems = [...temp];
        } else {
            this.selectedItems.push(obj);
        }

        let dataId = '[data-id=\"input-select-all-id-309\"]';
        let selectAllInputObj = this.template.querySelector(dataId);

        selectAllInputObj.indeterminate = (this.selectedItems.length > 0) ? 
            !(this.selectedItems.length == this.gridData.colunValues.length) : false;

        selectAllInputObj.checked = (this.selectedItems.length > 0) ? 
            (this.selectedItems.length == this.gridData.colunValues.length) : false;
    }

    onSelectAllGrid() {

        if (this.selectedItems.length == this.gridData.colunValues.length){
            this.selectedItems = [];
        }else{
            this.selectedItems = [];
            this.datalist.colunValues.forEach(row =>{
                this.selectedItems.push(this.gridMapObject.get(row.key));
            });
        }

        this.datalist.colunValues.forEach(row => {
            let dataIdName = '[data-id=\"'+row.key+'\"]';
            this.updateCheckboxRow(dataIdName, (this.selectedItems.includes(this.gridMapObject.get(row.key))));
        });
    }

    updateCheckboxRow(dataidName, checkedvalue){
        let selectAllInputObj = this.template.querySelector(dataidName);
        selectAllInputObj.checked = checkedvalue;
    }

    onSubmitClickHandler(){
        console.log('Selected Objects: ', this.selectedItems);
    }
}