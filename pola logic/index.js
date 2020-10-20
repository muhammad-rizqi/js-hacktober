// // // document.write('<pre/>')
// // // for(y = 1; y < 10; y++){
// // //     for(x = 1; x < 10; x++){
// // //         if(y==x){
// // //             document.write('*')
// // //         }else {
// // //             document.write(' ')
// // //         }
// // //     }
// // //     document.write('<br>')
// // // }

// // var kucing = {
// //     name : 'guntur',
// //     tipe : 'manja',

// //     meow : function(){
// //         document.write('mengeong untuk meminta makan')
// //     }
// // }


// // console.log(kucing)
// // kucing.meow()


// function santri(nama , usia) {
//     var data = {}
//     data.namalengkap = nama
//     data.umur   =   usia

//     console.log(data.namalengkap , data.umur)
// }

// santri('hello world', 13)
// santri('hey world' , 12)



// var santri = new Object()
// var s2     = new Object()
// santri.nama = 'mujahid'
// santri.jurusan = 'programmer'
// s2.nama = 'hmmm'
// s2.jurusan = 'multimedia'


// console.log(santri,s2)






// var siswa = { nama:'mujahid' , usia: 18}
// var x = siswa
// x.nama = 'bro'

// console.log(siswa)

var target = { a: 1, b: 2}
var source = { b: 4, c: 5}

var retrunedTarger = Object.assign(target, source)

console.log(target)
console.log(source)
console.log(retrunedTarger)