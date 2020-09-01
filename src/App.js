import React from 'react';
import DropDown from './components/DropDown';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      countries: [
        { id: 0, title: "Singapore" },
        { id: 1, title: "Malaysia" },
        { id: 2, title: "Indonesia" },
        { id: 3, title: "Philippines" },
        { id: 4, title: "Thailand" },
        { id: 5, title: "Japan" },
        { id: 6, title: "Vietnam" },
      ],
      addprivilege: false
    }

    this.toggle = this.toggle.bind(this);
  }

  // change the addPrivilege
  toggle = () => {
    this.setState(state => ({
      addprivilege: true
    }), console.log(this.state.addprivilege))
  }

  componentDidMount() {
    const url = '/countries'
      fetch(url).then(async res => {
          if(res.status !== 200) {
              console.log('Error in fetching countries.')
          } else {
              const response = await res.json();
              const data = response.data || []
              console.log(data)

              this.setState({
                countries: data
              })
          }
      })
  }

  // addCountry = (country) => {
  //   var countryList = this.state.countries;
  //   countryList.push(country);

  //   this.setState({
  //     countries: countryList
  //   })
  //   console.log(this.state.countries)
  // }

  // onAddEvent = (keyword) => {

  //   const countries = this.state.countries;
  //   const country = {
  //     id: countries.length,
  //     title: keyword
  //   }
  //   this.addCountry(country);
  // }

  render() {
    return (
      <div className="container">
        <div className="container-header"><h3>SMARTDROPDOWN</h3></div>
        <div className="config">
          <h4>Privilege : {this.state.addPrivilege ? 'Add' : 'None'}</h4>
          <button type="button" onClick={() => this.toggle()}>Change Privilege</button>
        </div>
        <DropDown
          title="Select Country"
          options={this.state.countries}
          searchable={true}
          noOfItems={4}
          enableAddSelect={this.state.addprivilege}/>
      </div>
    );
  }
}

export default App;


/*
  countries: [
        { id: 0, title: "Singapore" },
        { id: 1, title: "Malaysia" },
        { id: 2, title: "Indonesia" },
        { id: 3, title: "Philippines" },
        { id: 4, title: "Thailand" },
        { id: 5, title: "Japan" },
        { id: 6, title: "Vietnam" },
      ]
 */