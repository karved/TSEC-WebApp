# TSEC-WebApp
![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/tsec_logo_light.png)  
A Web-app made for Thadomal Shahani Engineering College by Mobile App Developers Club TSEC.  
Contributed as an integral member of the Web team towards building this project. 

## Purpose
Built to provide **1-way** communication from **Teachers --> Students**, **Principal --> Students** and **Principal --> Teachers**.  
Commmon College **Notifications** visible to everyone (bell icon in homescreen). Useful for direct communication incase of broadcasting messages, files, notes and important college related information. **Library** feature also provided which displays the books issued with dates for **returning** them and **penalty charges**.

### Sharing includes : 
* **Text**
* **Attatchment** (all other kinds of media, files)  

## Testing 

### Test version deployed at : https://test-tsec.netlify.app/  

**Credentials** for Testing 
```
Student Login : kd@gmail.com
Password:       123456

Teacher Login: teacher@gmail.com
Password:       123456
````

## Technology
* React JS
* Redux
* Firebase - **Real-time Database**
* Styling- [Materialize](https://materializecss.com/) , [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/)  

### Screenshots
---
|||
|---|----|
|![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/12.png) |![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/2.png) |
|![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/3.png) |![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/4.png) |
|![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/5.png) |![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/6.png) |
|![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/7.png) |![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/8.png) |
|![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/9.png) |![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/10.png) |
![alt text](https://github.com/karved/TSEC-WebApp/blob/master/pics/11.png)  

## Setup
1. Clone this Repository or Download zip.   

2. Navigate to project folder in terminal and type   
      ``` 
      npm install
      ```
      
3. Create your **Firebase** project at FIrebase [console](https://console.firebase.google.com/u/0/) 

4. Replace Firebase credentials in ```/src/config/firebaseConfig.js``` with your **credentials** from Firebase console.

5. Enable email-signin under **Firebase --> Develop --> Authentication**. Create **2 users**.

6. In your **Real-time Database** create the following structure
      ```
        {
          test: {
                  users: {
                          <uid#1>: {
                          
                                    branch:         "Computer"       #any branch
                                    class:          "C1"
                                    library_id:     "M999"
                                    name:           "<name>"
                                    photo:         "<photo_url>"
                                    roll no:        "12"         #any roll no
                                    type:          "student"
                                    year:           "TE"          #FE,SE,TE or BE
                          },
                          
                          
                          <uid#2>:{
                                   classgroups :{
                                   
                                                  <groud_id>:{
                                                              branch:      "Computer"
                                                              div:         "C1"
                                                              groud_id:    "<group_id>"
                                                              groupName:   "TE-Computer-C1"
                                                              year:         "TE"
                                                  }
                                                  
                                                  
                                     department:    "Computer"
                                     library_id:    "M323"
                                     name:          "<name>"
                                     photo:         "<photo_url>"
                                     type:          "teacher"
                                   }
                          
                          
                          }
                          
                   }
              
                }
        }
 
      ```  
      
7. Navigate to project folder in terminal and type
      ```
      npm start
      ```  
8. All set.
