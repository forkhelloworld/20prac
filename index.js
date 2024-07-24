/* 

1. Написати клас для реалізації структури даних Зв’язаний Список (LinkedList) (за прикладом ментора у відео-записах) та виконати на 
його основі наступну задачу:

- реалізувати метод addNthElement(data, position), який приймає значення data і порядковий номер елемента position, після якого він має 
вставити новий вузел списку з такими самими даними
 
*/
class ListItem {
  constructor(v) {
    this._data = v;
    this.next = null;
    this.prev = null;
  }

  get data() {
    return this._data;
  }

  set data(v) {
    this._data = v;
  }
}

class LinkedList {
  constructor(...args) {
    this.length = 0;
    this.head = null;
    this.tail = null;
    for (const value of args) {
      this.push(value);
    }
  }

  push(value) {
    const newItem = new ListItem(value);
    if (this.length === 0) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      this.tail.next = newItem;
      newItem.prev = this.tail;
      this.tail = newItem;
    }
    return ++this.length;
  }

  pop() {
    const deleted = this.tail;
    const preLast = this.tail.prev;
    preLast.next = null;
    this.tail = preLast;
    this.length--;
    return deleted;
  }

  shift() {
    const deleted = this.head;
    const nextElem = this.head.next;
    nextElem.prev = null;
    this.head = nextElem;
    this.length--;
    return deleted;
  }

  unshift(value) {
    const newItem = new ListItem(value);
    if (this.length === 0) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      newItem.next = this.head;
      this.head.prev = newItem;
      this.head = newItem;
    }
    return ++this.length;
  }

  find(value) {
    let currentItem = this.head;
    do {
      if (currentItem.data === value) {
        return currentItem;
      } else {
        currentItem = currentItem.next;
      }
    } while (currentItem !== null);
    return null;
  }

  newFind(value) {
    for (const item of this) {
      if (item.data === value) {
        return item;
      }
    }
    return null;
  }

  static fromArray(array) {
    return new LinkedList(...array);
  }

  toArray() {
    const arr = [];
    for (const item of this) {
      arr.push(item.data);
    }
    return arr;
  }

  //- реалізувати у класа метод deleteItem(data), який приймає певне значення data і видаляє зі зв’язаного списка перший знайдений елемент з такими даними.
  deleteItem(v) {
    for (const item of this) {
      if (item.data === v) {
        if (this.head.data === v) {
          return this.shift();
        } else if (this.tail.data === v) {
          return this.pop();
        }
        item.prev.next = item.next;
        item.next.prev = item.prev;
        this.length--;
        return this;
      }
    }
  }

  // - реалізувати метод addNthElement(data, position), який приймає значення data і порядковий номер елемента position, після якого він має вставити новий вузел списку з такими самими даними
  addNthElement(data, position) {
    const newItem = new ListItem(data);
    let item = this.head;
    for (let i = 1; i < position; i++) {
      item = item.next;
    }
    newItem.prev = item.prev;
    newItem.next = item;
    item.prev.next = newItem;
    item.prev = newItem;
    this.length++;
    return this;
  }

  [Symbol.iterator]() {
    return new LinkedListIterator(this);
  }
}

const ll = new LinkedList(5, 8, 10);

class LinkedListIterator {
  constructor(list) {
    this.list = list;
    this.currentNode = null;
  }

  next() {
    this.currentNode = this.currentNode
      ? this.currentNode.next
      : this.list.head;
    return {
      value: this.currentNode,
      done: !this.currentNode,
    };
  }
}

/*
2. Написати клас для реалізації власної структури даних, яка представляє собою колекцію елементів, нумеровану на кшталт “*1*”, “*2*” і т.д.

(Екземпляр цього класу - об’єкт вигляду
    {
      *1*: ‘first value’,
      *2*: ‘second value’,
      *3*: ‘third value’
    })
*/

class StarItem {
  constructor(key, value) {
    this._key;
  }
}

class StarCollection {
  constructor(...values) {
    this.length = 0;
    for (let value of values) {
      this.add(value);
    }
  }

  add(v) {
    return (this[`*${++this.length}*`] = v);
  }

  //3*. До колекції з завдання №2 написати метод [Symbol.iterator], який реалізує принцип обходу колекції
  [Symbol.iterator]() {
    let list = this;
    let index = 0;
    return {
      next() {
        return index < list.length
          ? { value: list[`*${++index}*`], done: false }
          : { done: true };
      },
    };
  }
}

/* 
4. Задача про парні дужки.Написати функцію, яка приймає вираз, що містить дужки різних типів - (), [], {}, <>, і перевіряє, чи правильно вони відкриваються і закриваються.

checkSequence(‘()(([]))’) // true
checkSequence(‘{][)’) // false

Підказка: для реалізації використовуйте структуру Stack
*/

class Stack {
  constructor(maxSize, ...arr) {
    this._maxSize = maxSize;
    this._size = 0;

    for (const item of arr) {
      this.push(item);
    }
  }

  get size() {
    return this._size;
  }

  get isEmpty() {
    return this._size === 0;
  }

  push(value) {
    if (this._size >= this._maxSize) {
      throw new RangeError("Stack overflow");
    }
    this[`_${this._size}`] = value;
    this._size++;
    return this._size;
  }

  pop() {
    if (this._size <= 0) {
      return;
    }
    const lastItem = this[`_${this._size - 1}`];
    delete this[`_${this._size - 1}`];
    this._size--;
    return lastItem;
  }

  pick() {
    return this[`_${this._size - 1}`];
  }
}
const brackets = {
  "(": ")",
  "{": "}",
  "[": "]",
};

function isSequenceRight(str, brackets) {
  const stack = new Stack(str.length);
  const closeBrackets = Object.values(brackets);
  for (const symb of str) {
    if (brackets[symb]) {
      stack.push(symb);
      continue;
    }
    if (stack.isEmpty && closeBrackets.includes(symb)) {
      return false;
    }
    const lastItemFromStack = stack.pick();
    const correctCloseBracket = brackets[lastItemFromStack];
    if (symb === correctCloseBracket) {
      stack.pop();
      continue;
    }
    if (closeBrackets.includes(symb)) {
      return false;
    }
  }

  return stack.isEmpty;
}
