## 0.4 Uusi muistiinpano:
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: Server fails to find /exampleapp/new_note, <br> but saves note and returns new destination in headers.
    server-->>browser: 302: redirect browser to /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: The HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The Javascript file
    deactivate server
    Note right of browser: Browser executing the JS code <br> triggers fetcing the JSON file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file with notes.
    deactivate server
    Note right of browser: Browser executes call back upon response <br> renders the page with notes from the JSON

```
## 0.5 Single Page App:
User goes to the Single Page App version of the page
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>-browser: The HTML document of the page

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: The CSS file

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>-browser: The Javascript file.
    Note right of browser: Browser executing the JS code triggers fetcing the JSON file

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>-browser: JSON file with notes.
    Note right of browser: Browser executes call back upon response <br> renders the page with notes from the JSON
    
```
## 0.6: Uusi muistiinpano
User adds a new note to the Single Page App version of the page
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server->>-browser: 201: Created.
    Note right of browser: The new note is added to the page.
```
