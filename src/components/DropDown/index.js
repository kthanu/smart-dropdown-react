import React from 'react'
import FontAwesome from 'react-fontawesome';
import './index.css'

class DropDown extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            title: this.props.title,
            options: this.props.options || [],
            value: undefined,
            noOfItems: this.props.noOfItems || 5,
            searchable: this.props.searchable || false,
            keyword: '',
            isClickedMore: false,
            enableAddSelect: this.props.enableAddSelect || false,
        }

        this.searchField = React.createRef();
        this.close = this.close.bind(this);
    }

    close = () => {
        this.setState({
            isOpen: false
        })
    }

    toggleOpen = () => {
        this.setState(state => ({
            isOpen: !state.isOpen,
            keyword: '',
            isClickedMore: false
        }), () => {
            if (this.state.isOpen && this.searchField.current) {
                this.searchField.current.focus();
                this.setState({
                    keyword: '',
                    isClickedMore: false
                })
            }
        });
    }

    handleOnClick = (item) => {
        const current = this.state.value;
        // console.log(`Current value : ${current ? current.id : current}`)
        if (current === undefined || current === null) {
            this.setState({
                value: item,
                isOpen: false
            })
            // console.log(item)
        } else if (current.id !== item.id) {
            this.setState({
                value: item,
                isOpen: false
            })
            // console.log(item)
        } else {
            this.setState({
                isOpen: false
            })
        }
    }

    isItemInSelection = (item) => {
        return true
    }

    filterOptions = (e) => {
        e.persist();
        const text = e.target.value.toLowerCase();
        console.log(text);

        this.setState({
            keyword: text
        })
    }

    displayMore = () => this.setState({
        isClickedMore: true
    })

    listItems = () => {
        const items = this.state.options;
        const searchable = this.state.searchable;
        const noOfItems = this.state.noOfItems;
        const keyword = this.state.keyword;
        const isClickedMore = this.state.isClickedMore;

        let tempList = items;

        if (keyword.length && searchable) {
            tempList = items.filter((item) => (
                item.title.toLowerCase().slice(0, keyword.length).includes(keyword)
            )).sort((a, b) => {
                if (a.title < b.title) { return -1 }
                if (a.title > b.title) { return 1 }
                return 0;
            })
        }

        const moreItems = tempList.length - noOfItems;
        
        if(!isClickedMore) {
            tempList = tempList.slice(0, noOfItems);
        }

        if (tempList.length) {

            const lastItem = tempList[tempList.length - 1];
        
            return (
                <>
                    {tempList.map(item => (
                        <li className="dd-list-item" key={item.id}>
                            <div className="dd-list-item-row">
                                <div 
                                    className="dd-list-item-row-text"
                                    onClick={() => this.handleOnClick(item)}>
                                    {item.title}
                                </div>
                                { !isClickedMore && moreItems > 0 && lastItem.id === item.id && (
                                    <div className="dd-list-item-row-btn">
                                        <button type="button" onClick={() => this.displayMore()}>
                                            <span>{`${moreItems} more..`}</span>
                                        </button>
                                    </div>
                                )}
                                
                            </div>
                        </li>
                    ))}
                </>
            )
        }

        return (
            <li className="dd-list-item" key={0}>
                <div className="dd-list-item-row">
                    <div className="dd-list-item-row-text">
                        {`"${keyword}" not found`}
                    </div>
                    {this.state.enableAddSelect && (
                        <div className="dd-list-item-row-btn">
                            <button className="add-btn" type="button" onClick={() => this.onAddEvent(this.state.keyword)}>
                                <span>Add & Select</span>
                            </button>
                        </div>
                    )}
                </div>
            </li>
        )
    }

    addOption = (option) => {
        var optionList = this.state.options;
        optionList.push(option);
    
        this.setState({
            options: optionList,
            value: option,
            isOpen: false
        })
        console.log(this.state.options)
      }
    
      onAddEvent = (keyword) => {
        const options = this.state.options;
        const option = {
          id: options.length,
          title: keyword
        }
        this.addOption(option);
      }

    // // Handle outside click when dropdown open.
    // componentDidUpdate() {
    //     const isOpen = this.state.isOpen;

    //     setTimeout(() => {
    //         if (isOpen) {
    //             window.addEventListener('click', this.close)
    //         } else {
    //             window.removeEventListener('click', this.close)
    //         }
    //     }, 0);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('click', this.close)
    // }

    render() {
        return (
            <div className="dd-wrapper">
                <div
                    tabIndex={0}
                    className="dd-header"
                    role="button"
                    onKeyPress={() => this.toggleOpen()}
                    onClick={() => this.toggleOpen()}
                >
                    <div className="dd-header__title">
                        <p className="dd-header__title--bold">{this.state.value ? this.state.value.title : this.state.title}</p>
                    </div>
                    <div className="dd-header__action">
                        {this.state.isOpen ? <FontAwesome name="angle-up" size="2x" /> : <FontAwesome name="angle-down" size="2x" />}
                    </div>
                </div>
                {this.state.isOpen && (
                    <div className="dd-list">
                        {this.state.searchable && (
                            <div className="dd-list-search-bar">
                                <input
                                    type="text"
                                    ref={this.searchField}
                                    className="dd-list-search-bar-input"
                                    placeholder="Search Country"
                                    onChange={(e) => this.filterOptions(e)} />
                            </div>
                        )}
                        <ul className="dd-list-menu">
                            {this.listItems()}
                        </ul>
                    </div>
                )}
                {/* {this.state.isOpen && (
                    <div 
                        className="dd-blanket"
                        onClick={() => this.close()}>
                    </div>
                )} */}
            </div>
        )
    }
}

export default DropDown;