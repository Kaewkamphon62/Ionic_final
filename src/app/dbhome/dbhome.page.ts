import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Student } from './notebooks';
import { StudentService } from './StudentService';
import { AngularFirestore } from '@angular/fire/compat/firestore';

var demodemo = 100

@Component({
  selector: 'app-home',
  templateUrl: 'dbhome.page.html',
  styleUrls: ['dbhome.page.scss'],
})

export class DbhomePage implements OnInit {
  stdobj: any;
  searchTerm: string;
  constructor(private apiservice: StudentService, private alertCtrl: AlertController,
    private router: Router, private ngFirestore: AngularFirestore) { }

  ngOnInit() {
    this.apiservice.getData().subscribe((res) => {

      this.stdobj = res.map((t) => (
        {  
          id: t.payload.doc.id,
          db_url_image: t.payload.doc.data()['db_url_image'.toString()],
          db_name: t.payload.doc.data()['db_name'.toString()],
          db_details: t.payload.doc.data()['db_details'.toString()],
          db_who: t.payload.doc.data()['db_who'.toString()],

          
          db_date: new Date(t.payload.doc.data()['db_date']).getDate()
          + "/" + (new Date(t.payload.doc.data()['db_date']).getMonth()+1)
          + "/" + (new Date(t.payload.doc.data()['db_date']).getFullYear()+543)
          + " " + (new Date(t.payload.doc.data()['db_date']).getHours())
          + ":" + (new Date(t.payload.doc.data()['db_date']).getMinutes())
          + ":" + (new Date(t.payload.doc.data()['db_date']).getSeconds())
        }

        ));
        console.log(this.stdobj);
      });

    }//method

    async presentPromptAdd() {
      const alert = this.alertCtrl.create({
        subHeader: 'Add',
        inputs: [
          {
            name: 'mdb_url_image',
            placeholder: 'ลิ้งรูป'
          },
          {
            name: 'mdb_name',
            placeholder: 'ชื่อเรื่อง'
          },

          {
            name: 'mdb_details',
            placeholder: 'รายละเอียด'
          },

          {
            name: 'mdb_who',
            placeholder: 'ชื่อผู้โพส'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Add',
            handler: data => {
              const tmpdata = {};
               tmpdata['db_url_image'.toString()] = data.mdb_url_image;
               tmpdata['db_name'.toString()] = data.mdb_name;
               tmpdata['db_details'.toString()] = data.mdb_details;
               tmpdata['db_who'.toString()] = data.mdb_who;

               tmpdata['db_date'] = Date.now();
                  this.apiservice.createUser(tmpdata);
                  console.log(tmpdata);
            }
          }
        ]
      });
      (await alert).present();
    }

    async presentConfirmDelete(delid: any) {
      const alert = this.alertCtrl.create({
        subHeader: 'Delete', // Header
        message: 'ยินยันการลบหรือไม่?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              //console.log('Buy clicked');

              this.apiservice.deleteUser(delid);
            }
          }
        ]
      });
      (await alert).present();
    }

// Update
    //async presentPromptEdit(id, name, age, address) {
      async presentPromptEdit(tmpobj) {
      const alert = this.alertCtrl.create({
        subHeader: 'Edit',
        message: 'แก้ไข: '+tmpobj.db_name,
        inputs: [

          {
            name: 'mdb_url_image',
            placeholder: tmpobj.db_url_image,
            value: tmpobj.db_url_image
          },
          {
            name: 'mdb_name',
            placeholder: tmpobj.db_name,
            value: tmpobj.db_name
          },
          {
            name: 'mdb_details',
            placeholder:tmpobj.db_details,
            value: tmpobj.db_details
          },
          {
            name: 'mdb_who',
            placeholder: tmpobj.db_who,
            value: tmpobj.db_who
          }
        ],
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'ยืนยันอัพเดต',
            handler: data => {
              const updatedata = {};
               updatedata['db_url_image'.toString()] = data.mdb_url_image;
               updatedata['db_name'.toString()] = data.mdb_name;
               updatedata['db_details'.toString()] = data.mdb_details;
               updatedata['db_who'.toString()] = data.mdb_who;

               updatedata['db_date'] = Date.now();
               ///this.ngFirestore.doc('/Student/'+id).update(updatedata);
               this.apiservice.updateUser(tmpobj.id, updatedata);
               console.log(updatedata);
            }
          }
        ]
      });
      (await alert).present();
    }


}//class
