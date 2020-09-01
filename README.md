# smart-dropdown-react

## Dependencies
- [react-fontawesome](https://www.npmjs.com/package/react-fontawesome)
- [express](https://www.npmjs.com/package/express)
- [connect-api-mocker](https://www.npmjs.com/package/connect-api-mocker)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [cors](https://www.npmjs.com/package/cors)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Folder Structure
- mock-api
    - countries
        - GET
- src
    - assets
        - css
    - components
        - Dropdown

## `Dropdown` usage.

```js
<DropDown
    title="Select Country"
    options={this.state.countries}
    searchable={true}
    noOfItems={4}
    enableAddSelect={this.state.addprivilege}/>

```

## props

- title - Dropdown Title
- options - Array of Dropdown items
    - item: `{id: <value>, title: <title>}`
- searchable - Boolean for enable or disable the Search Input
- noOfItems - Maximum no of items display on the dropdown menu.
- enableAddSelect - Boolean for enable or disable the Add & Select search item.

## Available Scripts

In the project directory, you can run:

### `npm start`

Run the project in local server.

### `npm run mock-api` or `node mock-api/app.js`

Run the mock server

### `npm run dev`

Run both web app + mock server.
