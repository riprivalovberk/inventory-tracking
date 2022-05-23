import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {addItem, getItems, deleteItem, editItem, addComment, deleteComment, getComments} from '../actions/itemActions'
import PropTypes from 'prop-types'

class InventoryList extends Component {

    componentDidMount() {
        this.props.getItems();
        this.props.getComments();
    }

    onDeleteClick = (id, name) => {
        const text = prompt('Enter Optional Comment');
        if(text) {
            const newComment = {
                text: text,
                itemName: name,
                itemid: id
            }
            this.props.addComment(newComment)
        } else {
            const newComment = {
                text: "N/A",
                itemName: name,
                itemid: id
            }
            this.props.addComment(newComment)
        }
        this.props.deleteItem(id);
        window.location.reload();
        
    }
    onAddClick = name => {
        const newItem = {
            name: name,
        }
        this.props.addItem(newItem);
    }

    onUndoClick = (id, itemName, itemid) => {
        const newItem = {
            _id: itemid,
            name: itemName
        }
        this.props.addItem(newItem);
        this.props.deleteComment(id);
    }

    onEditClick = (id, newName) => {
        this.props.editItem(id, newName);
        this.props.getItems();
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        const { items } = this.props.item;
        const { comments } =  this.props.item;
        return(
            <Container>
                <h1 style = {{marginTop: 40}}>Inventory</h1>
                <Button 
                color="dark"                 
                onClick = {() => {
                    const name = prompt('Enter Item Name');
                    if(name) {
                        this.onAddClick(name);
                    }
                }}>Create Item</Button>
                <ListGroup>
                    <TransitionGroup className="inventory-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key = {_id} timeout = {500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        style = {{
                                            marginRight: 4
                                        }}
                                        onClick={this.onDeleteClick.bind(this, _id, name)}
                                    >Delete</Button>
                                    <Button
                                        className="edit-btn"
                                        size="sm"
                                        style = {{
                                            marginRight: 4
                                        }}
                                        onClick = {() => {
                                            const newName = prompt('Enter New Item Name');
                                            if(newName) {
                                                this.onEditClick(_id, newName);
                                                window.location.reload();
                                            }
                                        }}
                                    >Edit</Button>
                                    {name}
                                </ListGroupItem>    
                            </CSSTransition>
                            
                        ))}
                    </TransitionGroup>
                    <h1 style = {{marginTop: 40}}>Deleted Items</h1>
                    <TransitionGroup className="comment-list">
                        {comments.map(({_id, text, itemName, itemid}) => (
                            <CSSTransition key = {_id} timeout = {500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="edit-btn"
                                        size="sm"
                                        style = {{
                                            marginRight: 4
                                        }}
                                        color="danger"
                                        onClick = {() => {
                                            this.onUndoClick(_id, itemName, itemid);
                                            window.location.reload();
                                        }}
                                    >Undo</Button>
                                    {' Item Name: ' + itemName + '  ||| Comment: ' + text}
                                </ListGroupItem>    
                            </CSSTransition>
                            
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}
InventoryList.propTypes = {
    getItems: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    item: state.item,

});

export default connect(mapStateToProps, {getItems, deleteItem, addItem, editItem, addComment, deleteComment, getComments})(InventoryList);