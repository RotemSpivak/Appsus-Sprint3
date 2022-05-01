import { MailService } from "../services/mail.service.js"

import { EmailNav } from "../cmps/email-nav.jsx"
import { EmailList } from "../cmps/email-list.jsx"
import { NewMail } from "../cmps/new-mail.jsx"
import { EmailDetails } from "../cmps/email-details.jsx"


export class MailApp extends React.Component {
    state = {
        emails: [],
        critiria: 'inbox',
        isNewEmail: false,
        isOpenMail: false,
        noteMail: '',
        isTrash: false,
        currOpenMail: {},
        draftMail: {
            to: '',
            subject: '',
            body: ''
        }
    }



    componentDidMount() {
        this.getEmails()
        let noteData = new URLSearchParams(this.props.location.search)
        let noteValue = noteData.get('noteTitle')
        if (noteValue) {
            this.setState({ isNewEmail: true, noteMail: noteValue })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            if (!this.props.searchTerm) {
                this.getEmails()
                return
            }

            const regex = new RegExp(this.props.searchTerm, 'ig')
            if (this.props.searchTerm) {
                MailService.query(this.props.searchTerm, true)
                    .then(emails => {
                        this.setState({ emails: emails })
                    })
            }

            console.log(this.props.searchTerm)
            return
        }

    }

    getEmails = () => {
        MailService.query(this.state.critiria)
            .then(emails => {
                this.setState({ emails: emails })
            })
    }

    changeStateCritiria = (value) => {
        this.setState({ isNewEmail: false, isOpenMail: false, critiria: value }, this.getEmails)
    }

    onNewEmail = () => {
        document.body.style.pointerEvents = 'none'
        this.setState({ isNewEmail: true, isOpenMail: false, isTrash: false }, this.getEmails)
    }

    onCloseMail = (prevState) => {
        document.body.style.pointerEvents = 'all'
        this.setState(...prevState, { isOpenMail: false, noteMail: '' }, this.getEmails)


    }

    onSentMail = () => {
        document.body.style.pointerEvents = 'all'
        this.setState({ isNewEmail: false, isOpenMail: false, isTrash: false, noteMail: '' })
    }

    onDeleteEmail = (emailId,isReturn) => {
        MailService.deleteEmail(emailId,isReturn)
        this.setState({isOpenMail: false})
        this.getEmails()
    }

    onCheckStar = (email) => {
        if (email.isChecked) email.isChecked = false
        else email.isChecked = true

        this.getEmails()
    }

    sendDraftInfo = (email) => {
        this.setState({ emailDits: { to: email.to, subject: email.subject, body: email.body } })
        let emailDits = {
            to: email.to,
            subject: email.subject,
            body: email.body
        }
    }

    onOpenMail = (email) => {
        if (email.isRead) email.isRead = false
        else email.isRead = true
        this.getEmails()
    }

    onClickMail = (email) => {
        email.isRead = true
        this.setState({ isOpenMail: true, currOpenMail: email })
    }

    render() {
        const { emails, isNewEmail, isOpenMail } = this.state
        return <section>
            <div className="emails-section">
                <nav className="email-nav dad">
                    <EmailNav critiria={this.state.critiria} onNewEmail={this.onNewEmail} changeStateCritiria={this.changeStateCritiria} />

                </nav>
                <div className="preview">
                    {!isOpenMail && <EmailList onOpenMail={this.onOpenMail} onDeleteEmail={this.onDeleteEmail} onCheckStar={this.onCheckStar} onClickMail={this.onClickMail} emails={emails} />}
                    {isNewEmail && <NewMail onCloseMail={this.onCloseMail} noteMail={this.state.noteMail} draftMail={this.state.draftMail} onSentMail={this.onSentMail} />}
                    {isOpenMail && <EmailDetails onDeleteEmail={this.onDeleteEmail} email={this.state.currOpenMail} />}
                </div>
            </div>
        </section>
    }
}