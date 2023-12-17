const getJSON=(url)=>{
    return fetch(url).then(res=>{
        if (!res.ok) throw new Error(`Country not found ${res.status}`);// Error: Country not found 404
        return res.json();
    })
}

const get3Countries= async (c1,c2,c3)=>{
    try{
        // const [data1]= await getJSON(`https://restcountries.com/v3.1/name/${c1}`)
        // const [data2]= await getJSON(`https://restcountries.com/v3.1/name/${c2}`)
        // const [data3]= await getJSON(`https://restcountries.com/v3.1/name/${c3}`)

        // at a time call fetch like parallel way
        const data=await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`)
        ])

        // console.log([data1.capital, data2.capital, data3.capital]);
        console.log(data);

    }catch(err){
        console.error(err.message);
    }
};
get3Countries('portugal', 'canada', 'bangladesh')