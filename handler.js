'use strict';
var firebase = require("firebase/app");
require('firebase/database');
// var admin = require("firebase-admin");
// var serviceAccount = require("./smart-india-hackathon-24a7a-firebase-adminsdk-heioz-0cd2d2bf8a.json");


function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
     return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,

        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}



exports.handler = (event,context,callback) => {


     context.callbackWaitsForEmptyEventLoop = false;
     var firebaseConfig = {
        apiKey: "AIzaSyCO558rpWEB36e3iEPnscBTIlJ8XqemPIc",
        authDomain: "smart-india-hackathon-24a7a.firebaseapp.com",
        databaseURL: "https://smart-india-hackathon-24a7a.firebaseio.com",
        projectId: "smart-india-hackathon-24a7a",
        storageBucket: "smart-india-hackathon-24a7a.appspot.com",
        messagingSenderId: "1087948033266",
        appId: "1:1087948033266:web:e80765fb6d0f193f77146b",
        measurementId: "G-7Z9LZRSDSM"
     };

        // admin.initializeApp({
        //   credential: admin.credential.cert(serviceAccount),
        //   databaseURL: "https://smart-india-hackathon-24a7a.firebaseio.com"
        // });

    if(firebase.apps.length == 0) {
        firebase.initializeApp(firebaseConfig);
    }

    try {

      const name = event.currentIntent.slots.Name;
      const firType = event.currentIntent.slots.firType;
      // For theft
       const date = event.currentIntent.slots.date;
       const time_of_theft = event.currentIntent.slots.timeStolen;
       const description_of_theft = event.currentIntent.slots.descriptionStolen;
       const item_stolen = event.currentIntent.slots.itemStolen;
     // for missing person
      const name_of_missing_person = event.currentIntent.slots.nameMissing;
      const relation = event.currentIntent.slots.relationMissing;
      const complexity = event.currentIntent.slots.complexityMissing;
      const height = event.currentIntent.slots.heightMissing;
      const age = event.currentIntent.slots.ageMissing;
    // for murder
      const who_was_murdered = event.currentIntent.slots.murderName;
      const when = event.currentIntent.slots.dateMurder;
      const how_victim_was_murder = event.currentIntent.slots.howMurdered;
      const suspect = event.currentIntent.slots.suspectMurder;
      const are_you_eye_witness = event.currentIntent.slots.eyewitnessMurder;
      const describe_murderer = event.currentIntent.slots.describeMurderer;



      const source = event.invocationSource;


      if(source === "DialogCodeHook"){

        const outputSessionAttributes = event.sessionAttributes || {};
        let slots = event.currentIntent.slots;

        if(name === null){
          callback(null,delegate(outputSessionAttributes,slots))
        } else if(name !== null && firType === null) {

          callback(null,elicitSlot(
            outputSessionAttributes,
            event.currentIntent.name,
            event.currentIntent.slots,
            "firType",
            {
              contentType:'PlainText',
              content:`Hello ${name} we are here to help you. Can you please select the category of complaint.`
            }

          ));

        } else if (name!==null && firType!==null) {

          if(firType === "theft"){

                    if(item_stolen===null){

                      callback(null,elicitSlot(
                        outputSessionAttributes,
                        event.currentIntent.name,
                        event.currentIntent.slots,
                        "itemStolen",
                        {
                          contentType:'PlainText',
                          content:`Ok ${name} Can you please tell me what has been stolen.`
                        }

                      ));

                    } else if(item_stolen!==null && date ===null) {

                      callback(null,elicitSlot(
                        outputSessionAttributes,
                        event.currentIntent.name,
                        event.currentIntent.slots,
                        "date",
                        {
                          contentType:'PlainText',
                          content:`So, ${name} can you please tell me when your ${item_stolen} has been stolen.`
                        }

                      ));

                    } else if(item_stolen!==null && date!==null && time_of_theft==null){

                      callback(null,elicitSlot(
                        outputSessionAttributes,
                        event.currentIntent.name,
                        event.currentIntent.slots,
                        "timeStolen",
                        {
                          contentType:'PlainText',
                          content:`Can you tell me the time of theft.`
                        }

                      ));

                    } else if(item_stolen!==null && date!==null && time_of_theft!==null && description_of_theft===null) {

                      callback(null,elicitSlot(
                        outputSessionAttributes,
                        event.currentIntent.name,
                        event.currentIntent.slots,
                        "descriptionStolen",
                        {
                          contentType:'PlainText',
                          content:`Ok ${name} Can you please tell me more details about your ${item_stolen}.`
                        }

                      ));

                    } else if (item_stolen!=null && date!==null && time_of_theft!==null && description_of_theft!==null){


                      var obj = {
                        category:"theft",
                        item_stolen:item_stolen,
                        date:date,
                        time_of_theft:time_of_theft,
                        description_of_theft:description_of_theft
                      };

                      var ref = firebase.database().ref('/shivamprajapati').set(obj).then((res)=>{
                      	  callback(null,close(
                        outputSessionAttributes,
                         'Fulfilled',
                          {
                            contentType: 'PlainText',
                            content: "Ok please now click on proceed button below to continue "
                          }
                      ));
                      }).catch((err)=>{
                        console.log(err);
                      });


                    }

          } else if (firType === "missing person") {

                if(name_of_missing_person===null){

                  callback(null,elicitSlot(
                    outputSessionAttributes,
                    event.currentIntent.name,
                    event.currentIntent.slots,
                    "nameMissing",
                    {
                      contentType:'PlainText',
                      content:`Ok ${name}  please tell me the name of the missing peron.`
                    }

                  ));


                } else if(name_of_missing_person!==null && relation===null){
                  callback(null,elicitSlot(
                    outputSessionAttributes,
                    event.currentIntent.name,
                    event.currentIntent.slots,
                    "relationMissing",
                    {
                      contentType:'PlainText',
                      content:`How ${name_of_missing_person} is related to you?`
                    }

                  ));

                } else if (name_of_missing_person!==null && relation !== null && height === null) {
                  callback(null,elicitSlot(
                    outputSessionAttributes,
                    event.currentIntent.name,
                    event.currentIntent.slots,
                    "heightMissing",
                    {
                      contentType:'PlainText',
                      content:`Ok ${name} please tell height of ${name_of_missing_person}.`
                    }

                  ));

                } else if( name_of_missing_person!==null && relation!==null && height !== null && age === null) {
                  callback(null,elicitSlot(
                    outputSessionAttributes,
                    event.currentIntent.name,
                    event.currentIntent.slots,
                    "ageMissing",
                    {
                      contentType:'PlainText',
                      content:`What is the age of ${name_of_missing_person}.`
                    }

                  ));

                } else if (name_of_missing_person!==null && relation!==null && height !== null && age !== null && complexity === null) {
                  callback(null,elicitSlot(
                    outputSessionAttributes,
                    event.currentIntent.name,
                    event.currentIntent.slots,
                    "complexityMissing",
                    {
                      contentType:'PlainText',
                      content:`What is the complexity of ${name_of_missing_person}.`
                    }

                  ));
                } else if(name_of_missing_person!==null && relation!==null && height!==null && age !== null && complexity!==null){


                          var obj = {
                            category:"missing person",
                            name_of_missing_person:name_of_missing_person,
                            relation:relation,
                            height:height,
                            age:age,
                            complexity:complexity
                          };

                          var ref = firebase.database().ref('/shivamprajapati').set(obj).then((res)=>{
                          	  callback(null,close(
                            outputSessionAttributes,
                             'Fulfilled',
                              {
                                contentType: 'PlainText',
                                content: "Ok please now click on proceed button below to continue"
                              }
                          ));
                          }).catch((err)=>{
                            console.log(err);
                          });

                }

           } else if (firType === "murder") {
             if(who_was_murdered === null){
               callback(null,elicitSlot(
                 outputSessionAttributes,
                 event.currentIntent.name,
                 event.currentIntent.slots,
                 "murderName",
                 {
                   contentType:'PlainText',
                   content:`What is the name of the person who was murdered`
                 }

               ));
             } else if(who_was_murdered!==null && when === null) {

               callback(null,elicitSlot(
                 outputSessionAttributes,
                 event.currentIntent.name,
                 event.currentIntent.slots,
                 "dateMurder",
                 {
                   contentType:'PlainText',
                   content:`when victim was murdered`
                 }

               ));

             } else if(who_was_murdered!==null && when !==null && how_victim_was_murder === null){

               callback(null,elicitSlot(
                 outputSessionAttributes,
                 event.currentIntent.name,
                 event.currentIntent.slots,
                 "howMurdered",
                 {
                   contentType:'PlainText',
                   content:` ${name} please tell me how ${who_was_murdered} was murdered.`
                 }

               ));

             } else if(who_was_murdered!==null && when !==null && how_victim_was_murder!==null && are_you_eye_witness===null) {

               callback(null,elicitSlot(
                 outputSessionAttributes,
                 event.currentIntent.name,
                 event.currentIntent.slots,
                 "eyewitnessMurder",
                 {
                   contentType:'PlainText',
                   content:`Are you the eye witness`
                 }

               ));

             } else if (who_was_murdered!==null && when !==null && how_victim_was_murder!==null && are_you_eye_witness !==null) {

                 if(are_you_eye_witness === "yes") {

                   if(describe_murderer===null){

                     callback(null,elicitSlot(
                       outputSessionAttributes,
                       event.currentIntent.name,
                       event.currentIntent.slots,
                       "describeMurderer",
                       {
                         contentType:'PlainText',
                         content:`Then can you please describe the murderer.`
                       }

                     ));
                   } else {

                         var obj = {
                           category:"murder",
                           who_was_murdered:who_was_murdered,
                           when:when,
                           how_victim_was_murder:how_victim_was_murder,
                           are_you_eye_witness:are_you_eye_witness
                           describe_murderer:describe_murderer,
                           suspect:suspect
                         };

                         var ref = firebase.database().ref('/shivamprajapati').set(obj).then((res)=>{
                         	  callback(null,close(
                           outputSessionAttributes,
                            'Fulfilled',
                             {
                               contentType: 'PlainText',
                               content: "Ok please now click on proceed button below to continue"
                             }
                         ));
                         }).catch((err)=>{
                           console.log(err);
                         });

                   }

                 } else if( are_you_eye_witness === "no") {

                   callback(null,elicitSlot(
                     outputSessionAttributes,
                     event.currentIntent.name,
                     event.currentIntent.slots,
                     "suspect",
                     {
                       contentType:'PlainText',
                       content:`Then if you have any suspect then describe about him`
                     }

                   ));

                 } else if(are_you_eye_witness === "no" && suspect!==null){


                       var obj = {
                         category:"murder",
                         who_was_murdered:who_was_murdered,
                         when:when,
                         how_victim_was_murder:how_victim_was_murder,
                         are_you_eye_witness:are_you_eye_witness
                         describe_murderer:describe_murderer,
                         suspect:suspect
                       };

                       var ref = firebase.database().ref('/shivamprajapati').set(obj).then((res)=>{
                       	  callback(null,close(
                         outputSessionAttributes,
                          'Fulfilled',
                           {
                             contentType: 'PlainText',
                             content: "Ok please now click on proceed button below to continue"
                           }
                       ));
                       }).catch((err)=>{
                         console.log(err);
                       });

                 }

             }

           }


        }


      }


    } catch (e) {
      callback(e);
    }

};
