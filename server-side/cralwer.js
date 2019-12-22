const request = require('request');
const cheerio = require('cheerio');
const {Profile} = require('./db/profileClass')
const moment = require('moment');

let lastUpdate = moment()





const crawler = () => {
    // const data  = ['https://www.zoominfo.com/p/Henry-Schuck/1260398587',
    //     'https://www.zoominfo.com/p/Nir-Keren/-2057816813',
    //     'https://www.zoominfo.com/p/Hila-Nir/1645938489',
    //     'https://www.zoominfo.com/p/Alyssa-Lahar/1900751569',
    //     'https://www.zoominfo.com/p/Justin-Withers/1843376157',
    //     'https://www.zoominfo.com/p/Chris-Hays/2827525345',
    //     'https://www.zoominfo.com/p/Tal-Raz/-1341784091',
    //     'https://www.zoominfo.com/p/Frank-Drake/11358348',
    //     'https://www.zoominfo.com/p/Jeff-Markowitz/3012810474',
    //     'https://www.zoominfo.com/p/Mike-Grundy/955686452',
    //     'https://www.zoominfo.com/p/Steven-Collis/1827581',
    //     'https://www.zoominfo.com/p/Mitchell-Butier/1177118584',
    //     'https://www.zoominfo.com/p/Kathleen-Mazzarella/373217116',
    //     'https://www.zoominfo.com/p/Perry-Sook/11989839',
    //     'https://www.zoominfo.com/p/Prem-Reddy/12582539'
    //     ]
    const data = [];

    
    data.map((pageToVisit)=> {
        request(pageToVisit, function(error, response, body) {
            if(error) console.log("Error: " + error)
            if(response.statusCode === 200) {
                const $ = cheerio.load(body);
                console.log("Page title:  " + $('title').text());
                const data = getDataFromPage($);
                if( moment(data.lastUpdate).isBetween( moment().subtract(1, 'day'), moment() ) ) {
                    new Profile({...data}).addToDb().then(doc => console.log(doc))
                    
                }
            }
        });
    })
    
    


    const getDataFromPage = ($) => {
        let data = {};
        data['name'] = $('title').text()
        data['jobTitle'] = ( $('.personMain_basicInfo-occupation-title').text())
    
        $('.primeSection_details-row').each(function(index, element) {
            let label = $(this).children().first().text()
            label = label.substring(0, label.length-1);
            let camel = label.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                    return index == 0 ? word.toLowerCase() : word.toUpperCase();
                }).replace(/\s+/g, '');
            data[camel] = $(this).children().last().text()                        
        })
        return data;
    }


}





module.exports = {crawler}

