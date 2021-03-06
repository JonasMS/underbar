(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n === 0 ? [] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object'){
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
    return;
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var truthyArr = [];

    _.each(collection, function(el){
      if(test(el)){ truthyArr.push(el) }
    });

    return truthyArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    var falsyArr = [];

    _.each(collection, function(el){
      if(!test(el)){ falsyArr.push(el) }
    });

    return falsyArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArr = [];

    _.each(array, function(el, ind){
      if(_.indexOf(array, el) === ind){
        uniqArr.push(el);
      }
    });
    return uniqArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var array = [];

    _.each(collection, function(el) {
      array.push(iterator(el));
    });
    return array;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  /*
    
  */

  _.reduce = function(collection, iterator, accumulator) {
    var val; 
    var newCollection = (Array.isArray(collection)) ? collection.slice(0) : collection;

    var val = (accumulator === undefined) ? newCollection.shift() : accumulator;

    _.each(newCollection, function(el) {
      val = iterator(val, el);
    });

    return val;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    // if(typeof Array.isArray(collection)){

      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);

    // } else if (typeof collection === 'object') {
      
    // }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var func = (iterator === undefined) ? function(el){ return el;} : iterator; 

    return _.reduce(collection, function(allTrue, item){
      if(!allTrue){ return false; }
      // return func(item);
      if(func(item)){ 
        return true;
      } else { return false; } 
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // some === atLeastOne AND !every
    var wasTruthy = false;
    var func = (iterator === undefined) ? function(el){ return el; } : iterator; 

    _.each(collection, function(el){
      if(func(el)){ wasTruthy = true; }
      // if(wasTruthy){ return true; }
      // return false;
    });
    return wasTruthy;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var keysArr = [];
    var addedObj = {};

    for(var i = 1; i < arguments.length; i++){
      keysArr = Object.keys(arguments[i]);
      addedObj = arguments[i];

      _.each(keysArr, function(el){
        obj[el] = addedObj[el]; 
      });

    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var keysArr = [];
    var addedObj = {};

    for(var i = 1; i < arguments.length; i++){
      keysArr = Object.keys(arguments[i]);
      addedObj = arguments[i];

      _.each(keysArr, function(el){
        if(!_.contains(Object.keys(obj), el)){
        obj[el] = addedObj[el]; 
        }
      });
      
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  /*
    Problem: Memoize is passed in a function. If the function has been called 
    with the same arguments before, then memoize returns the result from the 
    previous identical call.

    Solution: 
      1. check if arguments are in argsList
      2. IF NOT, run the function AND store the arguments in argsList

  */
  _.memoize = function(func) {
    var argsList = {};
    var val;
    var hasPassed;

    return function() {
      for(var key in arguments){ val = (arguments[key]); }
      hasPassed = argsList.hasOwnProperty(val);

      if(!hasPassed){
        argsList[val] = func.apply(this, arguments);
      } 
      return argsList[val];  
    }; 
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for(var i = 2; i < arguments.length; i++){
      args.push(arguments[i]);
    }
         
    setTimeout(function(argumentList) {
    func.apply(this, argumentList);
      
    }, wait, args);
    return;
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = array.slice(0);
    var randArr = [];
    var randIdx;

    while(newArr.length > 0){
      randIdx = getRandom(0, newArr.length);
      randArr.push(newArr[randIdx]);
      newArr = removeSpecific(newArr, randIdx);
    }
    return randArr;
  };

var removeSpecific = function(arr, idx){
      arr = [].concat(arr.slice(0, idx), arr.slice(idx+1));
      return arr;
    };

var getRandom = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};
  
  


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var result = [];

    var wrap = function() {
      if (typeof functionOrKey === 'string'){
        _.each(collection, function(el) {
          result.push(el[functionOrKey]());
        });
      } else {_.each(collection, function(el) {
        result.push(functionOrKey.apply(el));
        });
      }
      return result;
    };

    return wrap();
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  /*
    Problem: sort each element in 'collection', from lowestVal to highestVal, of collection[iterator]
    Solution: 
      1. find lowest specified val in collection
      2. push val to result
      3. remove val from collection

    curEl = collection[x]
    nextEl = collection[x+1]

    A: curEl[iterator] < nextEl[iterator]
    B: swap positions of curEl and nextEl

  */
  _.sortBy = function(collection, iterator) {
    var copy = collection.slice(0);
    var result = [];
    var limit = collection.length;
    var idx;

    
    while(result.length < collection.length){
      idx = findLow(copy, iterator);
      result.push(copy[idx]);
      copy = removeEl(copy, idx);


      if(!isDefined(copy[0], iterator, copy) && !hasDefined(copy, iterator)){
        _.each(copy, function(el){
          result.push(el);
        });
      }
    }
  
    return result;
  };

  //helper functions
  //comparison
  var fnOrKey = function(el, iterator){
    return (typeof iterator === 'string') ? el[iterator] : iterator(el);
  };

  //isDefined and hasDefined are used to handle undefined values 
  //in arrays passed into _.sortBy
  var isDefined = function(el, iterator, collection){
    if(collection.length){
      var val = fnOrKey(el, iterator);
      return (val === undefined) ? false : true;
    }
  };

  var hasDefined = function(collection, iterator) {
    var result = false;
    
    _.each(collection, function(el){
      if(isDefined(el, iterator, collection)){
        result = true;
      }
    });
    return result;
  };

  //returns the index of the lowest value in collection
  var findLow = function(collection, iterator){
    var valIdx;
    var curVal;
    var lowVal;

    _.each(collection, function(el, idx){
      curVal = fnOrKey(el, iterator);

       if(lowVal === undefined || curVal < lowVal){
        lowVal = curVal;
        valIdx = idx;
      }
    });
   return valIdx;
  };

  var removeEl = function(collection, idx){
    for(var i = idx; i < collection.length-1; i++){
      collection[i] = collection[i+1];
    }
    collection.pop();
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
/*
  Problem: create an array of arrays. sub-arrays contain the elements of n-index
  of each passed-in array
  Solution: 
    1. find longest array
    2. for longArr.length, place el of n-index into nIndex for each array
      3. push nIndex into result
      4. clear nIndex
    5. return result
*/

  _.zip = function() {
    var result = [];
    var nIndex = [];
    var targetArr;

    //find longest array by sorting array by length
    //and picking the last el
    var argsArr = argsToArr(arguments);
    var byLength = (_.sortBy(argsArr, 'length'));

    for(var i = 0; i < byLength[byLength.length-1].length; i++){
      _.each(arguments, function(curArr){
        nIndex.push(curArr[i]);
      });
      result.push(nIndex);
      nIndex = [];
    }
    
    return result;

  };

  var argsToArr = function(args){
    var argsArr = [];
    for(var key in args){
      argsArr.push(args[key]);
    }
    return argsArr;
  };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
/*
  Problem: return all passed-in values in a single array
  Solution:
    1. loop over each element in 'nestedArray'
    2. IF an element isArray, loop over every element in the element
      3. ELSE, push element to 'result' 
*/


  _.flatten = function(nestedArray, result) {
    if(result === undefined) { result = []; }

    _.each(nestedArray, function(el){
      if(Array.isArray(el)){
        _.flatten(el, result);
      } else {  result.push(el); } 
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  /*
    Solution: compare each el in the first passed-in array with each el in 
    each 1+n passed-in array
      1. compare array 1 with array 1+0
        2. IF el's match, compare el in next array (e.g. array 1+1)
        3. ELSE compare next el in array 1 
  */
  _.intersection = function() {
    var i = 0;
    var firstArg = arguments[0];
    var nArgs = getArgs(arguments, 1); 
    var matches = [];

    _.each(firstArg, function(el){
      //IF el can be found in the current array
      //check the next array
      while(_.indexOf(nArgs[i], el) > -1){
        i++;
        //IF the comparison operation has gone through all the arrays
        //THEN el is found in all the arrays
        if(i >= nArgs.length){ 
          matches.push(el); 
          break;
        }
      }
      i = 0;
    });
    return matches;
  };

  //Helper Function
  //returns an array of all the elements in the arguments object
  //starting with a specified index, 'start'
  var getArgs = function(args, start){
    var argsList = [];
    for(var i = start; i < args.length; i++){
      argsList.push(args[i]);
    }
    return argsList;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.


  /*
    Solution:
      1. compare el of array 1 to els of array 1+n
        2. IF el is NOT present in any array, THEN push el into result
        3. ELSE move onto next el of array 1
  */
  _.difference = function(array) {
    var result = [];
    var nArrs = getArgs(arguments, 1);
    var i = 0;

    _.each(array, function(el){
      while(_.indexOf(nArrs[i], el) === -1){
        i++;
        if(i >= nArrs.length){
          result.push(el);
          break;
        }
      }
      i = 0;
    });
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
