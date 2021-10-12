module.exports = {
    "query": (context, searchQuery) => {

        const q = searchQuery.toLowerCase();
        const mockData = [
            {
                "displayName": "Alex Wilber",
                "givenName": "Alex",
                "surname": "Wilber",
                "jobTitle": "Fictitous Character",
                "mobilePhone": "+1-443-555-1234",
                "emailAddresses": [
                    {
                        "name": "alex@contoso.com",
                        "address": "alex@contoso.com"
                    }
                ]
            },
            {
                "displayName": "Bob German",
                "givenName": "Bob",
                "surname": "German",
                "jobTitle": "Bottle washer",
                "mobilePhone": "+1-617-555-1234",
                "emailAddresses": [
                    {
                        "name": "Bob@contoso.com",
                        "address": "Bob@contoso.com"
                    }
                ]
            },
            {
                "displayName": "Megan Bowen",
                "givenName": "Megan",
                "surname": "Bowen",
                "jobTitle": "Fictitous Character",
                "mobilePhone": "+1-404-555-1234",
                "emailAddresses": [
                    {
                        "name": "megan@contoso.com",
                        "address": "megan@contoso.com"
                    }
                ]
            },
            {
                "displayName": "Rabia Williams",
                "givenName": "Rabia",
                "surname": "Williams",
                "jobTitle": "Content Creator",
                "mobilePhone": "+61-1223-4567",
                "emailAddresses": [
                    {
                        "name": "Rabia@contoso.com",
                        "address": "Rabia@contoso.com"
                    }
                ]
            },
            {
                "displayName": "Waldek Mastykarz",
                "givenName": "Waldek",
                "surname": "Mastykarz",
                "jobTitle": "Guitarist",
                "mobilePhone": "+31-1233-4555",
                "emailAddresses": [
                    {
                        "name": "Waldek@contoso.com",
                        "address": "Waldek@contoso.com"
                    }
                ]
            }
        ];
        return mockData.filter(c => (c.givenName.toLowerCase().startsWith(q) ||
                                     c.surname.toLowerCase().startsWith(q)));
    }
}