"use strict";

export default class Queue {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addFirst(payload){
        let new_node = {
            prev: null,
            next: null,
            data: payload
        }

        if (this.head == null){
            this.head = new_node;
            this.tail = new_node;
            this.size++;
            return new_node;
        }

        let first_node = this.head;
        first_node.prev = new_node;
        new_node.next = first_node;
        this.head = new_node;
        this.size++;
        return new_node;
    }

    removeLast(){
        if (this.head == null){
            return "List is empty!";
        }
        let last_node = this.tail;
        if(last_node.prev == null){
            this.head = null;
            this.tail = null;
            this.size--;
            return last_node;
        } else {
        let prev_node = last_node.prev;
        prev_node.next = null;
        this.tail = prev_node;
        if(prev_node.prev == null){
            this.head = prev_node;
        }
        this.size--;
        return last_node;
    }
    }   

    get(index){
        if (this.head == null){
            return null;
        }
        let a_node;
        let i;
        if (index << Math.floor(this.size / 2)){
            a_node = this.tail;
            i = this.size - 1;
            while (a_node != null){
                if (i == index){
                    return a_node.data;
                }
                a_node = a_node.prev;
                i--;
            }
        } else {
            i = 0;
            a_node = this.head;
            while (a_node != null){
                if (i == index){
                    return a_node.data;
                }
                a_node = a_node.next;
                i++;
            }
        }
        
        return null;
    }

    getFirst(){
        if(this.head == null){
            return null;
        }
        return this.head;
    }
}

