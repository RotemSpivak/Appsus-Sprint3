import { LongText } from "./long-text.jsx";


export function EmailPreview({ email, onClickMail, onCheckStar, onDeleteEmail, onOpenMail }) {
    let titleLength = 50
    let bodyLength = 130
    let isRead = 'bold';
    let bcg = '';
    let envFav = <i onClick={(ev) => { onOpenMail(email), ev.stopPropagation() }} className="fa-solid fa-envelope hidden"></i>
    let regular;
    let isReturn = (email.isTrash) ? '' : 'super-hidden'

    if (!email.isChecked) regular = '-regular'
    else regular = ''
    if (email.isRead) {
        isRead = ''
        bcg = 'grey'
        envFav = <i onClick={(ev) => { onOpenMail(email), ev.stopPropagation() }} className="fa-solid fa-envelope-open hidden"></i>
    }
    let time = new Date(email.sentAt)
    let year = time.getFullYear()
    let month = time.toLocaleString('en-us', { month: 'short' });
    let day = time.getDate()
    let date = day + '/' + month + '/' + year
    return <div className={`email ${bcg} nav-head`}>
        <div className="star star-fav">
            <i onClick={() => { onCheckStar(email) }} className={`fa${regular} fa-star star ${email.isChecked}`}></i>
        </div>
        <div className="mail-info flex" onClick={() => onClickMail(email)}>
            <p className={`sent-from ${isRead}`}>{email.sentFrom}</p>
            <div className="text-preview flex">
                <LongText isBold={isRead} short={titleLength} text={email.subject} />
                <p className="bold coma"> - </p>
                <LongText className="right" isBold={''} short={bodyLength} text={email.body} />
            </div>
            <div className="date flex">
                <p className="date-write">{date}</p>
                <div className="pop">
                    {envFav}
                    <i onClick={(ev) => { onDeleteEmail(email.id), ev.stopPropagation() }} className="fa-solid fa-trash hidden"></i>
                    <i  onClick={(ev) => { onDeleteEmail(email.id,true), ev.stopPropagation() }}   className={`fa-solid fa-backward hidden ${isReturn}`}></i>
                </div>
            </div>

        </div>
        <div>
            <p className="phone-date">{date}</p>
        </div>
    </div>
}



