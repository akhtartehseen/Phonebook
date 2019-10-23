import Realm from 'realm';
export const CONTACT_SCHEMA = 'contacts'



export const ContactSchema = {
    name: CONTACT_SCHEMA,
    primaryKey: 'id',
    properties: {
     id: 'int',
     first_name: 'string',
     last_name: 'string?',
     phone_no: 'int',
     alternate_no: 'int?',
     email: 'string?',
     address: 'string?'
    }
};

let realm = new Realm({schema: [ContactSchema]});

const databaseOptions = {
    path: Realm.defaultPath,
    schema: [ContactSchema],
    schemaVersion: 0   //optional
}

export function insertContact(newContact) {
    realm.write(() => {
        realm.create(CONTACT_SCHEMA, newContact, true);
    });
}

export function listContact() {
  let contact = cloneRealm(realm.objects(CONTACT_SCHEMA));
  return contact;
}

export function search(text) {
    let contact = realm.objects(CONTACT_SCHEMA);
    let filteredContacts = cloneRealmSearch(contact, text);
    return filteredContacts;
  }

//   export function update(newContact) {
//     realm.write(() => {
//         realm.create(CONTACT_SCHEMA, newContact, true);
//     });
//   }  

 function cloneRealm(obj) {
    let recordList = []
    for (let index in obj) {
        let recordData = { ...obj[index] }
        recordList.push(recordData)
    }
    return recordList;
};

function cloneRealmSearch(obj, text) {
    let recordList = []
    let i = text.length;
    for (let index in obj) {
        let recordData = { ...obj[index] }
        if(recordData.first_name.charAt(0) == text.charAt(0)) {
        recordList.push(recordData)
        }
    }
    return recordList;
};


export function getPrimaryId() {
    let length = realm.objects(CONTACT_SCHEMA).length;
    let id = length == null ? 0 : length;
    return id;
  }
// export const insertContact = newContact => new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then(realm => {
//        realm.write(() => {
//          realm.create(CONTACT_SCHEMA, newContact);
//          resolve(newContact);
//        });
//     }).catch((error) => reject(error));;
// });

// export const listContact = () => new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then(realm => {
//          let contact = realm.objects(CONTACT_SCHEMA);
//          resolve(contact);
//     }).catch((error) => reject(error));;
// });