const Node = require('./node');
const chai = require('../test/setup-mocha');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.data = null;
        this.length = 0;
    }

    //display list
    display() {
        let current = this._head;
        while( current !== null ) {
            current = current.next;
        }
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node
        }
        this.len();
        return this;
    }

    head() {
        //if we delete node and want check data of null node
        if(this._head == null) {
            return null;
        }
        return this._head.data;
    }

    tail() {
        if(this._tail == null) {
            return null;
        }
        return this._tail.data;
    }

    at(index) {
        let current = this._head;
        let counter = 0;
        while (current) {
            if (counter == index) {
                return current.data;
            }
            current = current.next;
            counter++
        }
    }

    insertAt(index, data) {
        let current = this._head;
        let counter = 1;
        let node = new Node(data);
        if (index == 0) {
            //if empty list
            if(this.length == 0) {
                this.append(data);
            }
            else {
                this._head.prev = node;
                node.next = this._head;
                this._head = node;
            }
        } else {
            while (current) {
                current = current.next;
                if (counter == index) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;
                }
                counter++
            }
        }
        this.len();
    }

    len() {
        let current = this._head;
        let counter = 0;
        while (current !== null) {
            counter++;
            current = current.next;
        }
        this.length = counter;
    }

    isEmpty() {
        return this.length < 1;
    }

    clear() {
        //delete from list tail to take link
        let current = this._tail;
        let counter = this.length;
        while( current !== null ) {
            this.deleteAt(counter-1);
            current = current.prev;
            counter--;
        }
        this.len();
        return this;
    }

    deleteAt(index) {
        let current = this._head;
        let counter = 1;
        if (index == 0) {
            //if list contain only 1 item and haven't link
            if(this.length == 1) {
                this._head = null;
                this._tail = null;
            }
            else {
                this._head = this._head.next;
                this._head.prev = null;
            }
        } else {
            while (current) {
                current = current.next;
                if (current == this._tail) {
                    this._tail = this._tail.prev;
                    this._tail.next = null;
                } else if (counter == index) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++;
            }
        }
        this.len();
        return this;
    }

    reverse() {
        //if 1-item list - not reverse
        if(this.length <= 1)
            return this;
        let current = this._head;
        let prev = null;
        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let counter = 0;
        while (current) {
            if (current.data == data) {
                return counter;
            }
            current = current.next;
            counter++;
        }
        return -1;
    }
}

module.exports = LinkedList;
