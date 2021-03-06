import { BookService } from "../services/books-service.js"
import { eventBusService } from "../services/bus-service.js"
import { storageService } from "../../../services/storage.service.js"

export class GoogleSearch extends React.Component{
    state = {
        searchVal:'',
        books:[]
    }


    getGoogle = (ev) => {
        ev.preventDefault()
        const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?printType=books&q='
        const SEARCH_VAL = this.state.searchVal
        
        axios.get(GOOGLE_API+SEARCH_VAL)
        .then(result =>{
            this.setState({books:result.data.items})
        } 
        )
    }
    
    addNewBook = (book) => {
        BookService.onAddBookGoogle(book)
        this.props.getBooks()
        eventBusService.emit('user-msg',{
           bookId:book.id, type:'success', txt:'added book!'
        })
        
    }
    changeSearch = ({target}) => {
        this.setState({searchVal:target.value})
    }
    render(){
        const {searchVal,books} = this.state

        return <div>
            <form onSubmit={this.getGoogle}>
            <input onChange={this.changeSearch} value={searchVal} type="text" name="google-search"/>
            <button>Submit</button>
            </form>
            <ul>
              {books.map(book =>{return <li key={book.volumeInfo.title}>{book.volumeInfo.title}
               <button onClick={() => {this.addNewBook(book)}}>+</button></li>})}
            </ul>
        </div>

    }
}