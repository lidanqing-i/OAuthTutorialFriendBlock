window.onload = async function() {
    document.querySelector('button#button01').addEventListener('click', function() {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            // Use the token.
            let init = {
                method: 'GET',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };
            fetch(  
                'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyCjQfwjMUjEmueAnvi3XDeCcFArn0DeMgY',
                init)
                .then((response) => response.json())
                .then(function(data) {
                    console.log(data);
                });
        });
    });

    document.querySelector('button#button02').addEventListener('click', function() {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            // Use the token.
            let init = {
                method: 'GET',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            };
            fetch(  
                'https://gmail.googleapis.com/gmail/v1/users/me/profile', // access_token={YOUR_API_KEY}
                init)
                .then((response) => response.json())
                .then(function(data) {
                    console.log(data);
                });
            fetch(  
                'https://gmail.googleapis.com/gmail/v1/users/me/labels',
                init)
                .then((response) => response.json())
                .then(function(data) {
                    console.log(data);
                });
        });
    });

    document.querySelector('button#button03').addEventListener('click', function() {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            // Use the token.
            const messages = fetchMessageJson(token);
        }
    );
    }); 
}

async function fetchMessageJson(token){
    let init = {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is%3Aunread+AND+after%3A1702916925&access_token=AIzaSyCjQfwjMUjEmueAnvi3XDeCcFArn0DeMgY',
                init);
    const messages = await response.json();
    console.log(messages);
    return messages;
}

// Steps:
// 1. Get all messages according to search config
// 2. Create folder name is thread (in the message json)/message
// 3. Save the content and attachment in the folder named trhead_name/message_name



// An email message.

// JSON representation

// {
//   "id": string,
//   "threadId": string,
//   "labelIds": [
//     string
//   ],
//   "snippet": string,
//   "historyId": string,
//   "internalDate": string,
//   "payload": {
//     object (MessagePart)
//   },
//   "sizeEstimate": integer,
//   "raw": string
// }