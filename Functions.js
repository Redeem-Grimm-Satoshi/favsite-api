const crypto = require('crypto');
function sha256(data){

    if(!sha256.cache){
        console.log('initializing cache');
        sha256.cache={};
    }

    if(!sha256.cache[data]){
    const hash= crypto.createHash('sha256');
    hash.update(data);
    sha256.cache[data]=hash.digest('hex');
    
}else {
    console.log('cache hit');
}

return sha256.cache[data];
}


let data =[1,2,3,4,5];
data=data.map((x)=>x*x);
console.log(data);

const products =[

    {name: 'laptop charger', price:25},
    {name: 'phone charger', price:15},
    {name: 'laptop', price:1000},
    {name: 'phone', price:500},
    {name: 'headphones', price:100}
]

const discounted=products.map((product)=>({
    name: product.name,
    price: product.price/2,
}));

const profile ={
    username:'Redeem Grimm',
    reputation:1000,
    birthdate:new Date(),
    address:{
        street:'123 Main St',
        city:'Anytown',
        state:'CA',
        zip:'12345'
    },
    hobbies:['coding','gaming','hiking'],
    verified:true,
    name:null,
    email:undefined,
    speak:()=>console.log('hello ' + profile.username),
};

const user={
    username: 'Redeem Grimm',
    birthdate: null,
};

function delay(message){
    setTimeout(()=>{
        console.log(message);
    },2000);
}

delay('Redeem Grimm is the best programmer ever!');
console.log('Delay message completed');

const now=new Date().getFullYear();

console.log(user.birthdate ?? 'Birthdate not provided');

const status=now-(user.birthdate?.getFullYear?.() || now)>=18? 'adult' : 'minor';
console.log(status);

const profile2={ ...profile};
profile2.name='Redeem Grimm The Programmer';
console.log(profile.name);



const cheap =discounted.filter((product)=>product.price<100);
console.log(JSON.stringify(profile, null, 4));
console.log(discounted);
console.log(cheap);

console.log(sha256('Redeem Grimm2'));
console.log(sha256('Redeem Grimm3'));
console.log(sha256('Redeem Grimm4'));
console.log(sha256('Redeem Grimm5'));
console.log(sha256('Redeem Grimm6'));
console.log(sha256('Redeem Grimm7'));
console.log(sha256('Redeem Grimm8'));
console.log(sha256('Redeem Grimm9'));
console.log(sha256);