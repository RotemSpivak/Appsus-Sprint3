import waffle from '../assets/waffle.svg'
const {NavLink,withRouter} = ReactRouterDOM

class _AppHeader extends React.Component{
    state = {
        app: '',
        searchInputValue: ''
    }

    componentDidUpdate(prevProps){
        console.log('here')
        if (this.props.location.pathname === prevProps.location.pathname) return
        if(this.props.location.pathname.includes('notes')){
            this.setState({app: 'notes'})
        } else if (this.props.location.pathname.includes('maill')) {
            this.setState({app: 'maill'})
        } else {
            this.setState({app: ''})
        }
    }

    handleChange = ({target}) => {
        this.setState({searchInputValue: target.value}, () => {
            this.props.onSearch(this.state.app, this.state.searchInputValue)
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.setState({searchInputValue: ''})
    }

    render(){
        const {searchInputValue} = this.state
        return <header>
        <h3 className="logo">Appsus</h3>

        <form onSubmit={this.onSubmit} className={`search-header-form ${!this.state.app ? 'hidden' : ''}`}>
            <input className="search-header" placeholder="Search..." type="text" value={searchInputValue} onInput={this.handleChange} />
        </form>

        <nav className="links-header">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/maill'>Mail</NavLink>
            <NavLink to='/notes/:mailDetails'>Notes</NavLink>
            <NavLink to='/books'>Books</NavLink>
        </nav>
        {/* <svg className="waffle-icon" focusable="false" width="35px" height="35px" viewBox="0 0 30 30"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg> */}
    </header>
    }
}


export const AppHeader = withRouter(_AppHeader)