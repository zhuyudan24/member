

export default function path(parantfile,file) {
  return function(r) {
    import('components/'+ parantfile + '/' + file + '.vue').then((module) => {
      r(module);
    })
  }
}
