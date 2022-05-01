


export class EmailNav extends React.Component {
    state = {
        inbox: '',
        sent: '',
        openNav:'',
        header:'',
    }

    componentDidMount() {
        this.onChangeColor()
    }

    onMakeHighlight = (crit) => {
        this.setState({ highlighted: crit })
    }


    onChangeColor = () => {
        switch (this.props.critiria) {
            case 'inbox':
                this.setState({ inbox: 'red', sent: '' })
                break;
            case 'sent':
                this.setState({ inbox: '', sent: 'red' })
                break;

        }
        console.log(this.props.critiria)
    }

    onOpenNav = () => {
        if(this.state.openNav) this.setState({openNav:''})
        else this.setState({openNav:'nav-open'})
    }

    render() {
        const { inbox, sent } = this.state
        return <section className="section-nav">
            <button className="manu-btn" onClick={this.onOpenNav}>☰</button>
        <nav className={`email-navv header-nav ${this.state.openNav} child`}>
            <button className={`add-mail-btn ${this.state.openNav}`} onClick={() => this.props.onNewEmail()}> <img className="add-mail" src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png" alt="" />
                <div className="nav-txt">
                    <p className="btn-txt">Compose</p>
                </div>
            </button>
            <div className={`header-nav flex ${this.state.openNav} ${this.props.critiria === 'inbox' ? 'highlight' : ''}`} onClick={() => this.props.changeStateCritiria('inbox')}>
                <i className="fa-solid fa-inbox fa-nav"></i>
                <div className="nav-txt">
                    <p className="nav-head">Inbox</p>
                </div>
            </div>
            <div className={`header-nav flex ${this.state.openNav} ${this.props.critiria === 'sent' ? 'highlight-less' : ''}`} onClick={() => this.props.changeStateCritiria('sent')}>
                <i className="fa-solid fa-envelope-circle-check fa-nav"></i>
                <div className="nav-txt">
                    <p className="nav-head" >Sent</p>
                </div>
            </div>
            <div className={`header-nav flex ${this.state.openNav} ${this.props.critiria === 'starred' ? 'highlight-less' : ''}`} onClick={() => this.props.changeStateCritiria('starred')}>
                <i className="fa-solid fa-star fa-nav"></i>
                <div className="nav-txt">
                    <p className="nav-head">Starred</p>
                </div>
            </div>
            <div className={`header-nav flex ${this.state.openNav} ${this.props.critiria === 'draft' ? 'highlight-less' : ''}`} onClick={() => this.props.changeStateCritiria('draft')}>
            <i className="fa-solid fa-arrows-spin fa-nav spin"></i>
                <div className="nav-txt">
                    <p className="nav-head">Draft</p>
                </div>
            </div>
            <div className={`header-nav flex ${this.state.openNav} ${this.props.critiria === 'trash' ? 'highlight-less' : ''}`} onClick={() => this.props.changeStateCritiria('trash')} >
                <i className="fa-solid fa-trash-can fa-nav trash"></i>
                <div className="nav-txt">
                    <p className="nav-head">Trash</p>
                </div>
            </div>
        </nav>
        </section>
    }
}