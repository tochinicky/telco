export class Trie {
    next: {};
    leaf: boolean;
   
    constructor() {
        this.next = {};
        this.leaf = false;
      }
  
    insertItem(item) {
        let i = 0;
        let current = this;
    
        while (i < item.length) {
          let k = item[i];
    
          if (!current.next[k]) {
            let node = new Trie();
            current.next[k] = node;
          }
          current = current.next[k];
    
          if (i === item.length - 1) {
            current.leaf = true;
          } else {
            current.leaf = false;
          }
    
          i += 1;
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
        let s = "";
    
        let current = this;
    
        while (i < item.length) {
          let k = item[i];
          s += k;
          if (current.next[k]) {
            current = current.next[k];
          } else {
            return null;
          }
          i += 1;
        }
    
        return current.traversal(s);
    }
  }

// export default class TrieNode {
//     //subtract this value to get indices starting at 0
//     CHAR_INDEX_OFFSET = 97;
//     rootNode;
//     prefix;
//     matches = [];

//     constructor(words) {
//         this.rootNode = this.TrieNode();
//         if(words) this.build(words);
//     }

//     //getting charcode index / values
//     charToIndex = c => c.charCodeAt(0) - this.CHAR_INDEX_OFFSET;
//     indexToChar = i => String.fromCharCode(i + this.CHAR_INDEX_OFFSET);

//     //populate children for new trie nodes
//     getChildren = () => {
//         let a = [], max = 26;
//         for(let i = 0; i < max; i++) a.push(null);
//         return a;
//     }

//     //Create new trie nodes
//     TrieNode = () => ({ isEndOfWord: false, children: this.getChildren() }); 

//     //adding new words to our trie structure
//     add = word => {
//         let node = this.rootNode, i = 0;
//         for(let j = 0; j < word.length; j++){
//             i = this.charToIndex(word[j]);
//             if(node.children[i] == null)
//                 node.children[i] = this.TrieNode();
//             node = node.children[i];
//         }
//         node.isEndOfWord = true;
//     }

//     //checking if the word exists
//     exists = word => {
//         let node = this.rootNode, i = 0;
//         for(let j = 0; j < word.length; j++) {
//             i = this.charToIndex(word[j]);
//             if(node.children[i] == null) return false;
//             node = node.children[i];
//         }
//         return node.isEndOfWord;
//     }

//     crawl = (curr, cIndex, cTxt = '') => {
//         if(curr.isEndOfWord) 
//             this.matches.push(cTxt += this.indexToChar(cIndex));
//         for(let i = 0; i < curr.children.length; i++){
//             if(curr.children[i])
//                 this.crawl(curr.children[i], i, cTxt + this.indexToChar(cIndex))
//         }
//     }

//     //build trie
//     build = words => {
//         words.forEach( word => this.add(word));
//     }

//     getMatches = () => {
//         return this.matches.map(
//             m => this.prefix + m
//         ).join(
//             ', '
//         )
//     }

//     //predict
//     predict = (chars) => {
//         this.prefix = chars;
//         let currentNode = this.rootNode;
//         let i = 0;
//         //go to current level of tree
//         for(let c = 0; c < chars.length; c++){
//             i = this.charToIndex(chars[c]);
//             if(currentNode.children[i] == null) return false;
//             currentNode = currentNode.children[i];
//         }

//         // go through children
//         currentNode
//             .children.forEach((node, index) => {
//                 if(node)
//                     this.crawl(node, index);
//         });
//         return this;
//     }
// }

// class TrieNode {
//     public children: { [id: string]: TrieNode } = {};
  
//     public content: String;
//     public isWord: boolean;
//     constructor(i = '') {
//       this.content = i;
//     }
//   }
//   export class Trie {
//     public root: TrieNode;
//     constructor() {
//       this.root = new TrieNode();
//     }
  
//     public insert(word) {
//       let current = this.root;
//       for (let i = 0; i < word.length; i++) {
//         if (current[word[i]] == null) {
//           current.children[word[i]] = new TrieNode(word[i]);
//         }
//         current = current.children[word[i]];
//       }
//       current.isWord = true;
//       console.log(current.isWord);
//     }
//     public find(word): boolean {
//       let current = this.root;
//       console.log(this.root)
//       for (let i = 0; i < word.length; i++) {
//         const ch = word.charAt(i);
//         const node = current.children[ch];
//         console.log(node);
//         if (node == null) {
//           return false;
//         }
//         current = node;
//       }
//       return current.isWord;
//     }
//     countWords() {
//       if (!this.root) {
//         return console.log('No root node found');
//       }
//       var queue = [this.root];
//       var counter = 0;
//       while (queue.length) {
//         var node = queue.shift();
//         if (node.isWord) {
//           counter++;
//         }
//         for (var child in node.children) {
//           if (node.children.hasOwnProperty(child)) {
//             queue.push(node.children[child]);
//           }
//         }
//       }
//       return counter;
//     }
// }