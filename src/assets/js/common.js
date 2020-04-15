//数组中删除指定元素
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
//数组去重之相同的元素只保留一个
Array.prototype.unique = function(arr) {
  var hash=[];
  for (var i = 0; i < arr.length; i++) {
    if(hash.indexOf(arr[i])==-1){
      hash.push(arr[i]);
    }
  }
  return hash;
}

