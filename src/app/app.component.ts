import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    // NOVO
    var firebaseConfig = {
      apiKey: "AIzaSyBVfo3XLr6-fRTHT1nFujy9Lhq-jRLWnFo",
      authDomain: "clonetestar.firebaseapp.com",
      databaseURL: "https://clonetestar-default-rtdb.firebaseio.com/",
      projectId: "clonetestar",
      storageBucket: "clonetestar.appspot.com",
      messagingSenderId: "916746194127",
      appId: "1:916746194127:web:d77f1475fa9242dc93fbba"
    };
    // Initialize Firebase

    // OUTRO
    /* var firebaseConfig = {
      apiKey: "AIzaSyC1bNdiaEhKbiB1Yo1lS-XZJ_MRri2dNYQ",
      authDomain: "instagram-clone-c2b53.firebaseapp.com",
      databaseURL: "https://instagram-clone-c2b53-default-rtdb.firebaseio.com/",
      projectId: "instagram-clone-c2b53",
      storageBucket: "instagram-clone-c2b53.appspot.com",
      messagingSenderId: "168119407613",
      appId: "1:168119407613:web:e4f370ee422e45396eff94",
      Credential: './instagram-clone-c2b53-firebase-adminsdk-1gf1y-bcaf7fc874.json'
    }; */
    /* var firebaseConfig = {
      apiKey: "AIzaSyC1bNdiaEhKbiB1Yo1lS-XZJ_MRri2dNYQ",
      authDomain: "instagram-clone-c2b53.firebaseapp.com",
      storageBucket: "instagram-clone-c2b53.appspot.com",
      type: "service_account",
      appId: "1:168119407613:web:e4f370ee422e45396eff94",
      messagingSenderId: "168119407613",
      project_id: "instagram-clone-c2b53",
      private_key_id: "bcaf7fc87469a71b3ae0e3f49051b87fc2d15fe0",
      private_key: `\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDf5t9ffKApwLTr\\nclhlSbTJrhFQ31ocPXmA64sdD62oHIJdkFucsME8uUwvHfQMhhma+8KL+/mkLHuO\\nu/9o7b1xSRxsGWuwcmmsgkafww/p0JFDstPSbSyaUOevnl7WVPrma+5Z6lK6Hg76\\nSZuzw6A/Ruwtt3p3OqUd4ebhCEJQ7nQJO1ip+9O/4AUhe6X1f95ILj6Fkm0jjQGR\\nQaMN5NXklAFi8LUTSj5ikYDMWKpaHEc1DAOw/SZ04Nm/l2OhYSWdT2job8ZVCGz5\\nqVmW2qN9piLLDOfKOTbm0bnTdYMsT/sI4l8EnvdzYRPc+CTOhzIT1kJTNtjewahB\\nOQ06erSXAgMBAAECggEAIl2iTVqojqAIZNcBIFLGz+nKuJn/j7QT0SjWCljcs5/k\\nlo3QseUjU7mxKs4zJjTy+ynHO4sqTvuQ32CVnDpZSGkLVsA0GjoFZDf+tQjQiXe8\\nxCJPhs3A+dKPLRJmxgj3FaTdSanAltaEQABKSLYvA2dUWtP9lQ1ISKTitgl5fEhD\\ntEerJifW+8qFsYajr3V69PCHR3MEBJvxdEuZakuT7ajppMb9GFcyEIlKtg/NKvbQ\\niUEJyEi+nXhwof36cEIrvejGIvmb7uoelME1ZRDuTjcUpicl3rlX1+GIVu9oaO6a\\njHHoAnI8jARFA4D20sjSCeZH5wPfJo1NjZgUhvT7YQKBgQD478lVKVyae9IwDO8q\\nwcZx0vpCX8Y56NKny9Kt0W49dG7hFXUSjT6cuj5Xm3UUxuRO2mjo5cugSVDpGZhS\\ndbE3+61DUsCf6IYpJ6VFahw/fhgfdgSNlo4LllbxuF4SvHAPuatyGFF+PAp7FBcu\\nlNrFUe2TJGc3c+xRbAx9dP8gxwKBgQDmQT1Lz1awJsYaM2kz0A75uB+yI9sglY82\\nKSuF8lp+Pn8VawOd26A5Cj8tLXc2hp8Uhnj79zvVd2bCcio4E9NArBSEas7C2coF\\nWB3Uiw10Lj7RCY21fmJKtro/eqmDNdlDuJC59qeKae/ubd7kXasuqr3ObX/xXrUq\\n/Dk1BC2dsQKBgQDJQ0Tp34kJNXbYdnyfew9wU30WUMy5YS1/kGEDO0H/2bUTsf93\\nQk8O890Xg46Df9Jylk8fjTq2mtAZxiHK+XCQrKCGv88Q+jQN7gnHN2UjSFVEimxf\\n9Qte/uvIfqFAUK3haOHeWx74Cp8Gp1WeyaaexgBoaJQy1zyHD+6BOChVXQKBgAf2\\n+8LSkkIXpUSkwJ/dM5dpyhbkbKEM615JQEsq3fx99vFruT1NqpYuh47tgrEtKPWR\\nzT+SBszUi4ZwYot8DBOxoCgQdcSBuh5DNQz0HmwFaYDbnr5Hd+jzty+Y86IpS7Gv\\nAbqdEKCWF4mc3Vfy8Yf0ugoY+ZME3ql0/hmaYmWRAoGAPn4fz9zOdrnGIOut98Xi\\n0baCUQgIMIzXED0epF6NKppPTwvNq/Ni8qxbjzFY/Ru7wu7DVI5bYpIvWPrGfb+y\\nSs4vtJB9sfyF7fo1mYa5jnp2v+7+j/sp0rgJjodfqV17qzxkkLvnpEMFNpPMnbhG\\nxYfRVYRUI/AFy56aNw6TTBQ=\\n\\n`,
      client_email: "firebase-adminsdk-1gf1y@instagram-clone-c2b53.iam.gserviceaccount.com",
      client_id: "102219397374975734302",
      Credential: './instagram-clone-c2b53-firebase-adminsdk-1gf1y-bcaf7fc874.json',
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1gf1y%40instagram-clone-c2b53.iam.gserviceaccount.com",
      databaseURL: "https://instagram-clone-c2b53-default-rtdb.firebaseio.com"
    } */
    firebase.initializeApp(firebaseConfig)
  }

}
