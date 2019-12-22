const {mongoose} = require('./mongoose')

const profileSchema = new mongoose.Schema({
    name: String,
    jobTitle: String,
    companyLocation: String,
    companyName: String,
    hqPhone: String,
    lastUpdated: String
});
const ProfileModal = mongoose.model('Profile', profileSchema);


class Profile {
    constructor({name,jobTitle,location, company, hqPhone, lastUpdated}) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.companyLocation = location;
        this.companyName = company;
        this.hqPhone = hqPhone;
        this.lastUpdated = lastUpdated;
    }
    addToDb() {
        return new Promise((resolve,reject)=>{
            new ProfileModal(this).save().then(doc => resolve(doc))
            .catch(err =>reject(err))
        })
    }
    update() {}


}

const search = (searchTerm)  => {
    return ProfileModal.find({ $text: {$search : searchTerm } }, {score: {$meta: "textScore"}}).then(doc => doc)
        .catch(err => err)
}

const getData = () => {
        return ProfileModal.find().then(doc => doc)
        .catch(err => err)
} 

module.exports = {Profile,search, getData}