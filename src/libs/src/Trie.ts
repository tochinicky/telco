export class TrieNode {
    next: {};
    leaf: boolean;
    constructor() {
      this.next = {};
      this.leaf = false;
    }
  
    insertItem(item) {
      let i = 0
      let current = this;
  
      while (i < item.length) {
        let k = item[i]
        if (!current.next[k]) {
          let node = new TrieNode()
          current.next[k] = node
        }
        current = current.next[k];
  
        if (i === item.length - 1) {
          current.leaf = true
        } else {
          current.leaf = false
        }
  
        i += 1
      }
    }
  
    traversal(item) {
      if (this.leaf) {
        console.log(item);
      }
      for (let i in this.next) {
        let s = item + i;
        this.next[i].traversal(s)
      }
    }
  
    autocomplete(item:string) {
      let i = 0;
      let s = '';
  
      let current = this;
  
      while (i < item.length) {
        let k = item[i];
        s += k;
        if (current.next[k]) {
          current = current.next[k]
        } else {
          return 'NOT FOUND'
        }
        i += 1;
      }
      current.traversal(s);
      return 'END';
    }
  }