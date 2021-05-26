import { LightningElement } from 'lwc';

export default class LwcSelecGridWrapper extends LightningElement {

    sampleHideColuns = [
        'name', 'accountOwner'
    ];

    /**
     * Sample data
     * :: used by examples
     */
    sampleData = [
        {
            name: '123555',
            accountName: 'Rewis Inc',
            employees: 3100,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'Jane Doe',
            billingCity: 'Phoeniz, AZ',
        },

        {
            name: '123556',
            accountName: 'Acme Corporation',
            employees: 10000,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'San Francisco, CA',
            _children: [
                {
                    name: '123556-A',
                    accountName: 'Acme Corp. (Bay Area)',
                    employees: 3000,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'New York, NY',
                    _children: [
                        {
                            name: '123556-A-A',
                            accountName: 'Acme Corp. (Oakland)',
                            employees: 745,
                            phone: '837-555-0100',
                            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'John Doe',
                            billingCity: 'New York, NY',
                        },
                        {
                            name: '123556-A-B',
                            accountName: 'Acme Corp. (San Francisco)',
                            employees: 578,
                            phone: '837-555-0100',
                            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'Jane Doe',
                            billingCity: 'Los Angeles, CA',
                        },
                    ],
                },

                {
                    name: '123556-B',
                    accountName: 'Acme Corp. (East)',
                    employees: 430,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'San Francisco, CA',
                    _children: [
                        {
                            name: '123556-B-A',
                            accountName: 'Acme Corp. (NY)',
                            employees: 1210,
                            phone: '837-555-0100',
                            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'Jane Doe',
                            billingCity: 'New York, NY',
                        },
                        {
                            name: '123556-B-B',
                            accountName: 'Acme Corp. (VA)',
                            employees: 410,
                            phone: '837-555-0100',
                            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'John Doe',
                            billingCity: 'New York, NY',
                            _children: [
                                {
                                    name: '123556-B-B-A',
                                    accountName: 'Allied Technologies',
                                    employees: 390,
                                    phone: '837-555-0100',
                                    accountOwner:
                                        'http://salesforce.com/fake/url/jane-doe',
                                    accountOwnerName: 'Jane Doe',
                                    billingCity: 'Los Angeles, CA',
                                    _children: [
                                        {
                                            name: '123556-B-B-A-A',
                                            accountName: 'Allied Technologies (UV)',
                                            employees: 270,
                                            phone: '837-555-0100',
                                            accountOwner:
                                                'http://salesforce.com/fake/url/jane-doe',
                                            accountOwnerName: 'John Doe',
                                            billingCity: 'San Francisco, CA',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            name: '123557',
            accountName: 'Rhode Enterprises',
            employees: 6000,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'New York, NY',
            _children: [
                {
                    name: '123557-A',
                    accountName: 'Rhode Enterprises (UCA)',
                    employees: 2540,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'New York, NY',
                },
            ],
        },

        {
            name: '123558',
            accountName: 'Tech Labs',
            employees: 1856,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'New York, NY',
            _children: [
                {
                    name: '123558-A',
                    accountName: 'Opportunity Resources Inc',
                    employees: 1934,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'Los Angeles, CA',
                },
            ],
        },
    ];
}