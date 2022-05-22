import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {addItem, getItems, deleteItem, editItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

class InventoryList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }
    onAddClick = name => {
        const newItem = {
            name: name
        }
        this.props.addItem(newItem);
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
        return(
            <Container>
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
                                        onClick={this.onDeleteClick.bind(this, _id)}
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
                </ListGroup>
            </Container>
        );
    }
}
InventoryList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    item: state.item
});
export default connect(mapStateToProps, {getItems, deleteItem, addItem, editItem})(InventoryList);