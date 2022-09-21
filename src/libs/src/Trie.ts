class Trie {
    next: {};
    leaf: boolean;
   
    constructor() {
        this.next = {};
        this.leaf = false;
      }
  
    insertItem(item:string) {
        let i = 0;
        let current = this;
        let node = new Trie();
        while (i < item.length) {
          let k = item[i];
    
          if (!current.next[k]) {
            
            current.next[k] = node;
          }
          current = current.next[k];
    
          if (i === item.length - 1) {
            current.next[k] = node;
            current.leaf = true;
          } else {
            current.leaf = false;
          }
    
          i += 1;
        }
    }
  
    traversal(item:string) {
        if (this.leaf) {
          return [item];
        }
        let values = [];
        for (let i in this.next) {
          let s = item + i;
          values = [...values, ...this.next[i].traversal(s)];
        }
    
        return values;
      }
  
    autocomplete(item:string) {
        let i = 0;
        let s = "";
    
        let current = this;
    
        while (i < item.length) {
          let k = item[i];
          s += k;
          if (current.next[k]) {
            current = current.next[k];
          } else {
            return '';
          }
          i += 1;
        }
    
        return current.traversal(s);
    }
  }
  export default new Trie();