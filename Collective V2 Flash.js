const { connect } = require('http2');
const puppeteer = require('puppeteer');
var mysql = require('mysql');
const fs = require('fs');
const { Console } = require('console');
//var Pin = "20220606144746, 06/JUL/2022";
var user1 = '76966';
var pass1 = 'Collective10+';
var Agente = 0;
var contreapertura = 0;



(async () => {
    var Pines = fs.readFileSync('Pin.txt','utf-8', prueba =(error,datos)=>{
        if(error){
            throw error;
        }else{
            console.log(datos);
        }
    });
    
    /*console.log('2   ' + Pines.substring(0,2));
    console.log(Pines.length);*/
   for (let i = 0; i < Pines.length; i++) {
            if(Pines.substring(i+1,i+4) =='Co:'){
                console.log(Pines.substring(i+1,i+4));
                Pin = Pines.substring(i+4,i+31);
                break
            } 
    }


    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], devtools: false });

   Mineria(browser, 0, Pin);

})();


function  Mineria(browser, Indicador, Pin) {
    (async () => {
        

        const page = await browser.newPage();
        var exepcion = 0;
        let Primerpaso = setTimeout(() => {
            console.log("ENTRO EN EL PRIMERPASO")
            page.close();
            if (exepcion == 1) {
                Indicador = 1;
            } else {
                Indicador = 0;
            }

             Mineria(browser, Indicador, Pin);

        }, 20000);





        await page.setViewport({ width: 1368, height: 620 });
        await page.goto('https://annamineria.anm.gov.co/sigm/');


        console.log(Indicador);
        if (Indicador == 0) {
            try {
                Indicador = 1;
                console.log(user1);
                console.log(pass1);
                await page.type('#username', user1);
                await page.type('#password', pass1);

                page.click("#loginButton");


            } catch (ex) {
                exepcion = 1;
                console.log("Entro en el catch");
            }

        }


        console.log("El indicador es igual a " + Indicador);



        page.setDefaultTimeout(0);
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
        validador = 0;
        clearTimeout(Primerpaso);
        let Segundopaso = setTimeout(() => {
            console.log("ENTRO EN EL Segundopaso")
            page.close();
             Mineria(browser, Indicador, Pin);

        }, 35000);





        const solicitudes = await page.$x('//span[contains(.,"Solicitudes")]');
        await solicitudes[1].click();

        const lblRadicar = await page.$x('//a[contains(.,"Radicar solicitud de propuesta de contrato de concesión")]');
        await lblRadicar[0].click();
        if (Agente == 1) {
            await page.waitFor(2000);


            //await page.evaluate(() => document.getElementById("submitterPersonOrganizationNameId").value = "")
            await page.evaluate(() => document.getElementById("submitterPersonOrganizationNameId").value = "");

            //await page.waitForSelector('select[id="submitterPersonOrganizationNameId"]');
            //const Agente = await page.$('select[id=" submitterPersonOrganizationNameId"]');

            await page.type('#submitterPersonOrganizationNameId', '76966');
            //await page.type('#submitterPersonOrganizationNameId', '');

            await page.waitFor(3000);

            await page.keyboard.press("Enter");

            await page.waitFor(550);
        }



        await page.waitFor(2500)
        page.setDefaultTimeout(0);
        await page.waitForSelector('select[id="pinSlctId"]');
        const selectPin = await page.$('select[id="pinSlctId"]');
        await selectPin.type(Pin);
        console.log(Pin);

        await page.waitForXPath('//span[contains(.,"Continuar")]');
        const continPin = await page.$x('//span[contains(.,"Continuar")]');
        await continPin[1].click();
        await page.waitFor(1000);

        const Fallopin = await page.$$eval("span", links =>

            links.map(link => link.textContent)
        );
        console.log(Fallopin[44]);
        var cont = 1;
        for (let i = 0; i < Fallopin.length; i++) {
            const elemento = Fallopin[i];
            //console.log("Este es el " + i + " " + Fallopin[i]);
            if (elemento == "Vea los errores a continuación:") {
                cont = 0;
            }

        }
        console.log(cont);
        if (cont == "0") {
            page.setDefaultTimeout(0);
            await page.waitForSelector('select[id="pinSlctId"]');
            const selectPin = await page.$('select[id="pinSlctId"]');
            await selectPin.type(Pin);

            await page.waitForXPath('//span[contains(.,"Continuar")]');
            const continPin = await page.$x('//span[contains(.,"Continuar")]');
            await continPin[1].click();
            /*
                        //await page.waitFor(1000)
                        Primero();
            
                        browser.close();*/

        }

        /*await page.waitForNavigation({
           waitUntil: 'networkidle0',
       });*/

        if (await page.$x('//span[contains(.,"Vea los errores a continuación:")]').lenght > 0) {
            console.log('no pasó el pin');
            await page.waitForSelector('select[id="pinSlctId"]');
            const selectPin = await page.$('select[id="pinSlctId"]');
            await selectPin.type(Pin);

            const continPin = await page.$x('//span[contains(.,"Continuar")]');
            await continPin[1].click();
        }
        else if (await page.$x('//span[contains(.,"Vea los errores a continuación:")]').lenght == 0) {
            console.log('pasó el pin, hurra!');
        }






        await page.waitForSelector('button[ng-class="settings.buttonClasses"]');
        page.evaluate(() => {
            document.querySelector('[ng-class="settings.buttonClasses"]').click();

            //document.getElementsByClassName('ng-binding ng-scope').item(178).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(162).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(194).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(177).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(161).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(193).click();

            //document.getElementsByClassName('ng-binding ng-scope').item(162).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(174).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(176).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(178).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(180).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(182).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(192).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(194).click();

            //document.getElementsByClassName('ng-binding ng-scope').item(161).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(173).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(175).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(177).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(179).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(181).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(191).click();
            //document.getElementsByClassName('ng-binding ng-scope').item(193).click();

            document.getElementsByClassName('ng-binding ng-scope').item(162).click();
            document.getElementsByClassName('ng-binding ng-scope').item(174).click();
            document.getElementsByClassName('ng-binding ng-scope').item(176).click();
            document.getElementsByClassName('ng-binding ng-scope').item(178).click();
            document.getElementsByClassName('ng-binding ng-scope').item(180).click();
            document.getElementsByClassName('ng-binding ng-scope').item(182).click();
            document.getElementsByClassName('ng-binding ng-scope').item(192).click();
            document.getElementsByClassName('ng-binding ng-scope').item(194).click();

            document.getElementsByClassName('ng-binding ng-scope').item(161).click();
            document.getElementsByClassName('ng-binding ng-scope').item(173).click();
            document.getElementsByClassName('ng-binding ng-scope').item(179).click();
            document.getElementsByClassName('ng-binding ng-scope').item(177).click();
            document.getElementsByClassName('ng-binding ng-scope').item(183).click();
            document.getElementsByClassName('ng-binding ng-scope').item(181).click();
            document.getElementsByClassName('ng-binding ng-scope').item(193).click();
            document.getElementsByClassName('ng-binding ng-scope').item(195).click();

        })

        clearTimeout(Segundopaso);



        //console.log(Area10);
        var Aviso = 0;
        var contador = 0;
        var Band = 1;
        var IdArea = '';
        while (Band != 99) {

            console.log("Inicia el timer");
            let TimeArea = setTimeout(() => {
                console.log("ENTRO EN EL TimeArea");
                page.close();
                 Mineria(browser, Indicador, Pin);


            }, 20000);

            const selectArea = await page.$('select[name="areaOfConcessionSlct"]');
            await selectArea.type('Otro tipo de terreno');


            const continDetallesdelArea = await page.$x('//a[contains(.,"área")]');
            await continDetallesdelArea[4].click();

            const selectporCeldas = await page.$('select[id="selectedCellInputMethodSlctId"]');
            await selectporCeldas.type('Usando el mapa de selección para dibujar un polígono o ingresar celdas');
            contador++;
            if (contador >= 105) {
                page.close();
                 Mineria(browser, Indicador, Pin);
                console.log("entro en los 105");
                clearTimeout(TimeArea);
            }

            console.log(contador);

            console.log("y este es la bandera = " + Band);
            if (Band == 1) {

                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area19";
                Aviso = 1;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area19 = ['18N05E04D14R'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area19.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area19[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });
            } else if (Band == 2) {
                
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area17";
                Aviso = 0;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    
                    var Area17 = ['18N05E04D03F, 18N05A24Q23S, 18N05A24Q23N, 18N05A24Q23P, 18N05A24Q24Q, 18N05A24Q22Z, 18N05E04D03A, 18N05A24Q23Q, 18N05E04D03G, 18N05E04D03B, 18N05A24Q23X, 18N05E04D03D, 18N05E04D03K, 18N05A24Q24M, 18N05E04D02P, 18N05E04D02J, 18N05A24Q23V, 18N05A24Q23L, 18N05A24Q23M, 18N05A24Q23U, 18N05A24Q24L, 18N05E04D04C,', ' 18N05A24Q23R, 18N05A24Q23Z, 18N05A24Q24V, 18N05A24Q24W, 18N05A24Q24R, 18N05A24Q22U, 18N05E04D03C, 18N05A24Q23T, 18N05E04D03E, 18N05E04D02E, 18N05A24Q22P, 18N05A24Q23K, 18N05E04D03L, 18N05A24Q23Y, 18N05E04D04A, 18N05A24Q24S, 18N05E04D02U, 18N05A24Q23W, 18N05E04D03H, 18N05E04D04B, 18N05A24Q24K, 18N05A24Q24X'];
                    //document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area17.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area17[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });
            } else if (Band == 3) {
               
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area20";
                Aviso = 1;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area20 = ['18N05E05A11G, 18N05E05A11L, 18N05E05A11R'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area20.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area20[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });

            } else if (Band == 4) {
                
                /////EL AREA ESTA ABAJO ///////
                IdArea = "cag141x";
                Aviso = 1;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var cag141x = ['18N05A24P07S'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < cag141x.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + cag141x[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });
            } else if (Band == 5) {
               
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area21";
                Aviso = 0;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area21 = ['18N05E05A06A, 18N05E05A06Y, 18N05E05A07V, 18N05E05A07K, 18N05E05A07L, 18N05E05A07Y, 18N05E05A08F, 18N05E05A08R, 18N05E05A08H, 18N05E05A09V, 18N05E05A09F, 18N05A25M09Q, 18N05A25M24L, 18N05A25M14G, 18N05A25M24M, 18N05A25M19X, 18N05A25M14H, 18N05A25M09S, 18N05E04D09E, 18N05E05A06B, 18N05E05A07W, 18N05E05A07B, 18N05E05A07N, 18N05E05A07D, 18N05E05A07Z, 18N05E05A08L, 18N05E05A08U, 18N05E05A09Q, 18N05E05A04L, 18N05A25M14B, 18N05A25M24H, 18N05E05A09D, 18N05E04D10B, 18N05E04D10E, 18N05E05A06C, 18N05E05A06T, 18N05E05A07F, 18N05E05A07E, 18N05E05A08N, 18N05E05A08Z, 18N05E05A09R, 18N05E05A09L, 18N05A25M24X, 18N05A25M24S, 18N05E05A09I, 18N05E05A09Z, 18N05E05A04U, 18N05E05A04P, 18N05E05A06N, 18N05E05A06U, 18N05E05A07Q, 18N05E05A08W, 18N05E05A08E, 18N05E05A09K, 18N05E05A09A, 18N05A25M09V, 18N05E05A09G, 18N05A25M19G, 18N05A25M14R, 18N05E05A09S, 18N05E05A04X, 18N05E05A04H, 18N05A25M24C, 18N05A25M14C, 18N05A25M24Y, 18N05A25M09Y, 18N05E05A07R, 18N05E05A07S, 18N05E05A07M, 18N05E05A07H, 18N05E05A07U, 18N05E05A07P, 18N05E05A08V, 18N05E05A08A, 18N05E05A08S, 18N05E05A08D, 18N05E05A04B, 18N05A25M24G, 18N05A25M19L, 18N05E05A09H, 18N05E05A04M, 18N05E05A04C, 18N05A25M09X, 18N05A25M09T,'
                        , ' 18N05E05A09J, 18N05E05A09E, 18N05E05A06P, 18N05E05A06E, 18N05E05A07A, 18N05E05A07T, 18N05E05A08B, 18N05E05A08M, 18N05E05A08C, 18N05E05A08P, 18N05E05A08J, 18N05E05A09W, 18N05E05A04G, 18N05A25M24R, 18N05A25M24B, 18N05A25M09R, 18N05E05A09X, 18N05E05A04T, 18N05E05A04N, 18N05E05A04D, 18N05E05A09P, 18N05E04D10A, 18N05E04D10D, 18N05E05A06I, 18N05E05A06D, 18N05E05A07G, 18N05E05A07X, 18N05E05A07I, 18N05E05A07J, 18N05E05A08G, 18N05E05A08T, 18N05E05A08I, 18N05A25M19W, 18N05A25M14W, 18N05A25M14L, 18N05A25M09W, 18N05E05A09C, 18N05E05A04S, 18N05E05A09Y, 18N05E05A09T, 18N05E05A09N, 18N05A25M24T, 18N05E05A04J, 18N05E05A04E, 18N05A25M09U, 18N05E04D10C, 18N05E05A06Z, 18N05E05A06J, 18N05E05A07C, 18N05E05A08Q, 18N05E05A08K, 18N05E05A08X, 18N05E05A08Y, 18N05E05A09B, 18N05E05A04W, 18N05E05A04R, 18N05A25M24W, 18N05A25M19R, 18N05A25M19B, 18N05E05A09M, 18N05E05A04Y, 18N05E05A04I, 18N05E05A09U, 18N05E05A04Z'];

                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area21.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area21[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });

            } else if (Band == 6) {
             
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area11"
                Aviso = 0;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area11 = ['18N05A23Q17J, 18N05A23Q13W, 18N05A23Q18Y, 18N05A23Q13N, 18N05A23Q23P, 18N05A23Q18J, 18N05A23Q13J, 18N05A23Q24Q, 18N05A23Q19Q, 18N05A23Q19A, 18N05A23Q14Q, 18N05A23Q24B, 18N05A23Q19W, 18N05A23Q19L, 18N05A23Q19M, 18N05A23Q19G, 18N05A23Q19C, 18N05A23Q14S, 18N05A23Q14L, 18N05A23Q14H, 18N05A23Q19D, 18N05A23Q24P, 18N05A23Q14J, 18N05A23Q20Q, 18N05A23Q15K, 18N05A23Q25L, 18N05A23Q25S, 18N05A23Q25Z, 18N05A23Q25U, 18N05A23Q25P, 18N05A24M16V, 18N05A24M16A, 18N05A24M11V, 18N05A24M11F, 18N05A24M11A, 18N05A24M21R, 18N05A24M16L, 18N05A24M21T, 18N05A24M21M, 18N05A24M21N, 18N05A24M16T, 18N05A24M16M, 18N05A24M11H, 18N05A24M21U, 18N05A24M21E, 18N05A24M22F, 18N05A24M22R, 18N05A24M17R, 18N05A24M22X, 18N05A24M22T, 18N05A24M22I, 18N05A24M17T, 18N05A24M17I, 18N05A24M22P, 18N05A24M17J, 18N05A24M17E, 18N05A24M12Z, 18N05A24M12E, 18N05A24M23W, 18N05A24M13B, 18N05A24M23M, 18N05A24M18M, 18N05A24M18J, 18N05A24M13Y, 18N05A24M13Z, 18N05A24M13I, 18N05A24M14V, 18N05A24M14A, 18N05A24M24G, 18N05A24M14B, 18N05A24M24C, 18N05A24M19S, 18N05E04A04N, 18N05E04A04D, 18N05E04A04P, 18N05A24M24Z, 18N05A24M24E, 18N05A24M14Z, 18N05A24M25K, 18N05E04A05L, 18N05A24M15L, 18N05A24M15G, 18N05A24M20X, 18N05A24M20H,'
                        , ' 18N05A24M20C, 18N05A24M15Y, 18N05E04B01K, 18N05E04B01A, 18N05A24N21V, 18N05A24M25U, 18N05A24N21F, 18N05E04B01B, 18N05A24N11M, 18N05A24N16D, 18N05E04B06E, 18N05E04B01E, 18N05A24N16E, 18N05E04B07Q, 18N05A24N22Q, 18N05A24N22F, 18N05A24N22A, 18N05A24N22W, 18N05E04B07H, 18N05E04B02H, 18N05A24N22S, 18N05E04B02T, 18N05E04B02N, 18N05A24N22I, 18N05A24N17Y, 18N05E04B07P, 18N05A24N12Z, 18N05E04B08V, 18N05E04B08K, 18N05A24N18K, 18N05A24N18B, 18N05A23Q18Q, 18N05A23Q18F, 18N05A23Q23G, 18N05A23Q13L, 18N05A23Q18X, 18N05A23Q13S, 18N05A23Q18T, 18N05A23Q13Y, 18N05A23Q23E, 18N05A23Q13P, 18N05A23Q13E, 18N05A23Q24A, 18N05A23Q14K, 18N05A23Q19B, 18N05A23Q24Y, 18N05A23Q24I, 18N05A23Q19N, 18N05A23Q14N, 18N05A23Q14E, 18N05A23Q15A, 18N05A23Q15G, 18N05A23Q15B, 18N05A23Q20X, 18N05A23Q20C, 18N05A23Q25I, 18N05A23Q20T, 18N05A23Q25E, 18N05A23Q20Z, 18N05A23Q15Z, 18N05A23Q15E, 18N05A24M16K, 18N05A24M21W, 18N05A24M16S, 18N05A24M11M, 18N05A24M21P, 18N05A24M16J, 18N05A24M11P, 18N05A24M22Q, 18N05A24M17Q, 18N05A24M17B, 18N05A24M12B, 18N05A24M12X, 18N05A24M17N, 18N05A24M17D, 18N05A24M12T, 18N05A24M12I, 18N05A24M12D, 18N05A24M23Q, 18N05A24M18V, 18N05A24M13Q, 18N05A24M23L, 18N05A24M18W,'
                        , ' 18N05A24M13W, 18N05A24M13L, 18N05A24M23X, 18N05A24M23C, 18N05A24M23T, 18N05A24M18T, 18N05A24M13D, 18N05A24M24W, 18N05A24M24B, 18N05A24M19W, 18N05A24M19R, 18N05A24M14W, 18N05A24M14R, 18N05E04A04S, 18N05E04A04M, 18N05A24M24M, 18N05A24M19H, 18N05E04A04Z, 18N05A24M24P, 18N05A24M19U, 18N05E04A05V, 18N05A24M15Q, 18N05E04A05R, 18N05A24M25R, 18N05E04A10C, 18N05E04A05X, 18N05E04A05C, 18N05A24M15S, 18N05E04A05T, 18N05A24M20Y, 18N05A24M15I, 18N05E04B06A, 18N05A24M25J, 18N05A24N16A, 18N05A24M15Z, 18N05A24N11Q, 18N05A24M15P, 18N05A24N21B, 18N05A24N11R, 18N05A24N11G, 18N05A24N16H, 18N05E04B01N, 18N05E04B02A, 18N05A24N17V, 18N05A24N17K, 18N05A24N17A, 18N05A24N12V, 18N05A24N12Q, 18N05E04B02W, 18N05A24N17R, 18N05A24N17L, 18N05E04B07C, 18N05E04B02X, 18N05A24N17C, 18N05E04B07I, 18N05E04B02U, 18N05E04B02P, 18N05A24N22J, 18N05A24N22E, 18N05A24N17Z, 18N05A24N17P, 18N05E04B08F, 18N05E04B03V, 18N05A24N13V, 18N05A24N13Q, 18N05A23Q12J, 18N05A23Q23A, 18N05A23Q13A, 18N05A23Q18L, 18N05A23Q13G, 18N05A23Q13M, 18N05A23Q23Z, 18N05A23Q18Z, 18N05A23Q19K, 18N05A23Q14V, 18N05A23Q24W, 18N05A23Q24S, 18N05A23Q14X, 18N05A23Q19I, 18N05A23Q14I, 18N05A23Q24U, 18N05A23Q19J, 18N05A23Q19E,'
                        , ' 18N05A23Q14U, 18N05A23Q25V, 18N05A23Q20F, 18N05A23Q15Q, 18N05A23Q25R, 18N05A23Q25H, 18N05A23Q15S, 18N05A23Q15C, 18N05A23Q20Y, 18N05A24M21F, 18N05A24M21G, 18N05A24M21Y, 18N05A24M16Y, 18N05A24M16I, 18N05A24M22G, 18N05A24M22B, 18N05A24M17W, 18N05A24M12R, 18N05A24M22C, 18N05A24M22D, 18N05A24M17Y, 18N05A24M12Y, 18N05A24M22E, 18N05A24M17Z, 18N05A24M17U, 18N05A24M17P, 18N05A24M23K, 18N05A24M23F, 18N05A24M13V, 18N05A24M13F, 18N05A24M13A, 18N05A24M18R, 18N05A24M18L, 18N05A24M13G, 18N05A24M18H, 18N05A24M13H, 18N05A24M23Z, 18N05A24M23N, 18N05A24M23I, 18N05E04A04A, 18N05A24M24K, 18N05A24M24F, 18N05A24M19Q, 18N05A24M19K, 18N05A24M19F, 18N05E04A04B, 18N05A24M24X, 18N05A24M24S, 18N05A24M14M, 18N05A24M24T, 18N05A24M24I, 18N05A24M24D, 18N05A24M19N, 18N05A24M19J, 18N05A24M25Q, 18N05A24M20Q, 18N05A24M20K, 18N05E04A05B, 18N05A24M25L, 18N05A24M20B, 18N05E04A05M, 18N05A24M25X, 18N05A24M15M, 18N05A24M20N, 18N05A24M20D, 18N05A24M15T, 18N05E04A05Z, 18N05A24N21Q, 18N05A24N21A, 18N05A24N21G, 18N05A24N21M, 18N05A24N11X, 18N05A24N11H, 18N05A24N21N, 18N05A24N11T, 18N05A24N11N, 18N05E04B06P, 18N05E04B01P, 18N05E04B01J, 18N05A24N21P, 18N05A24N11Z, 18N05A24N11U, 18N05E04B02F,'
                        , ' 18N05E04B02R, 18N05E04B02L, 18N05E04B02G, 18N05A24N22R, 18N05A24N12L, 18N05A24N22C, 18N05A24N12X, 18N05A24N22D, 18N05E04B07J, 18N05E04B02Z, 18N05A24N22Z, 18N05A24N23F, 18N05A23Q12U, 18N05A23Q23Q, 18N05A23Q18W, 18N05A23Q18M, 18N05A23Q18C, 18N05A23Q23D, 18N05A23Q13U, 18N05A23Q19F, 18N05A23Q24R, 18N05A23Q24M, 18N05A23Q24C, 18N05A23Q14M, 18N05A23Q19T, 18N05A23Q19Z, 18N05A23Q19U, 18N05A23Q14Z, 18N05A23Q25G, 18N05A23Q20S, 18N05A23Q20H, 18N05A23Q25D, 18N05A23Q20J, 18N05A23Q15U, 18N05A23Q15P, 18N05A24M21K, 18N05A24M11Q, 18N05A24M16R, 18N05A24M16B, 18N05A24M11R, 18N05A24M21X, 18N05A24M21S, 18N05A24M11X, 18N05A24M11S, 18N05A24M21J, 18N05A24M22A, 18N05A24M12F, 18N05A24M22L, 18N05A24M22M, 18N05A24M17M, 18N05A24M17H, 18N05A24M12H, 18N05A24M22U, 18N05A24M12P, 18N05A24M12J, 18N05A24M23V, 18N05A24M18G, 18N05A24M13R, 18N05A24M13S, 18N05E04A03E, 18N05A24M23P, 18N05A24M18D, 18N05A24M19V, 18N05A24M14Q, 18N05A24M24R, 18N05A24M14G, 18N05E04A04C, 18N05A24M14H, 18N05E04A04T, 18N05A24M24N, 18N05A24M14T, 18N05A24M14I, 18N05A24M19Z, 18N05A24M14J, 18N05A24M15V, 18N05E04A05S, 18N05A24M25M, 18N05A24M25H, 18N05A24M25C, 18N05E04A10D, 18N05A24M25D, 18N05A24M20T, 18N05A24M20I,'
                        , ' 18N05A24M25Z, 18N05A24N16K, 18N05A24M20J, 18N05A24N11V, 18N05E04B01R, 18N05A24N21R, 18N05A24N21L, 18N05A24N16B, 18N05E04B01X, 18N05A24N16S, 18N05A24N16C, 18N05E04B06I, 18N05A24N21Y, 18N05A24N16I, 18N05A24N21Z, 18N05A24N21E, 18N05A24N16Z, 18N05A24N11J, 18N05E04B07A, 18N05E04B02Q, 18N05A24N12K, 18N05A24N17G, 18N05E04B07S, 18N05A24N22X, 18N05A24N12S, 18N05A24N12M, 18N05A24N12H, 18N05E04B02Y, 18N05A24N17N, 18N05A24N17I, 18N05A24N12Y, 18N05E04B03Q, 18N05E04B03F, 18N05A24N23V, 18N05A24N23A, 18N05A24N18A, 18N05A24N13F, 18N05A23Q22J, 18N05A23Q17Z, 18N05A23Q17P, 18N05A23Q12E, 18N05A23Q13K, 18N05A23Q23W, 18N05A23Q18R, 18N05A23Q13B, 18N05A23Q18H, 18N05A23Q13X, 18N05A23Q23Y, 18N05A23Q23T, 18N05A23Q23I, 18N05A23Q18D, 18N05A23Q19R, 18N05A23Q19S, 18N05A23Q14C, 18N05A23Q24D, 18N05A23Q19Y, 18N05A23Q14Y, 18N05A23Q14D, 18N05A23Q25W, 18N05A23Q20W, 18N05A23Q15R, 18N05A23Q15L, 18N05A23Q25M, 18N05A23Q25C, 18N05A23Q15X, 18N05A23Q15H, 18N05A23Q25Y, 18N05A23Q25T, 18N05A23Q20D, 18N05A23Q20E, 18N05A24M16F, 18N05A24M11K, 18N05A24M21L, 18N05A24M16W, 18N05A24M11B, 18N05A24M21I, 18N05A24M16X, 18N05A24M11D, 18N05A24M11Z, 18N05A24M11U, 18N05A24M11J, 18N05A24M12V, 18N05A24M12K,'
                        , ' 18N05A24M22W, 18N05A24M12C, 18N05A24M12N, 18N05A24M12U, 18N05A24M18Q, 18N05A24M23R, 18N05A24M23G, 18N05A24M18B, 18N05A24M13C, 18N05E04A03P, 18N05A24M23Y, 18N05A24M23U, 18N05A24M23E, 18N05A24M24V, 18N05A24M14K, 18N05E04A04L, 18N05A24M24L, 18N05A24M24Y, 18N05A24M19Y, 18N05E04A04E, 18N05A24M19P, 18N05A24M25V, 18N05E04A05W, 18N05A24M20W, 18N05A24M15W, 18N05A24M25S, 18N05E04A05Y, 18N05E04A05N, 18N05E04A10E, 18N05E04B01Q, 18N05A24M25P, 18N05E04B06G, 18N05A24N21W, 18N05A24N16R, 18N05A24N16G, 18N05A24N11W, 18N05A24N11L, 18N05E04B01S, 18N05E04B06N, 18N05E04B01T, 18N05A24N16Y, 18N05A24N11Y, 18N05E04B01Z, 18N05A24N16J, 18N05E04B07F, 18N05A24N22K, 18N05E04B07B, 18N05A24N12G, 18N05A24N22N, 18N05E04B02J, 18N05A24N12U, 18N05A24N12P, 18N05A24N12J, 18N05E04B08Q, 18N05E04B08A, 18N05E04B03K, 18N05A23Q22Z, 18N05A23Q17U, 18N05A23Q12P, 18N05A23Q23V, 18N05A23Q23K, 18N05A23Q13Q, 18N05A23Q13F, 18N05A23Q23B, 18N05A23Q18B, 18N05A23Q13R, 18N05A23Q23S, 18N05A23Q23M, 18N05A23Q23N, 18N05A23Q18I, 18N05A23Q23U, 18N05A23Q18E, 18N05A23Q19V, 18N05A23Q14A, 18N05A23Q14R, 18N05A23Q24N, 18N05A23Q24E, 18N05A23Q14P, 18N05A23Q25Q, 18N05A23Q25F, 18N05A23Q20L, 18N05A23Q25X, 18N05A23Q15N, 18N05A23Q15I,'
                        , ' 18N05A23Q25J, 18N05A23Q15J, 18N05A24M16Q, 18N05A24M11L, 18N05A24M21C, 18N05A24M21D, 18N05A24M11Y, 18N05A24M11T, 18N05A24M11N, 18N05A24M16Z, 18N05A24M11E, 18N05A24M17K, 18N05A24M17A, 18N05A24M17G, 18N05A24M22S, 18N05A24M17S, 18N05A24M17C, 18N05A24M12M, 18N05A24M18K, 18N05A24M18A, 18N05A24M13K, 18N05A24M18C, 18N05A24M13M, 18N05A24M18I, 18N05A24M18E, 18N05A24M13N, 18N05A24M13J, 18N05A24M13E, 18N05A24M14F, 18N05A24M14L, 18N05A24M19X, 18N05A24M19M, 18N05A24M19C, 18N05A24M14X, 18N05A24M19I, 18N05A24M19D, 18N05A24M14Y, 18N05E04A04U, 18N05A24M14U, 18N05A24M14P, 18N05E04A05K, 18N05E04A05A, 18N05A24M20V, 18N05A24M20F, 18N05A24M20A, 18N05A24M15K, 18N05A24M25G, 18N05A24M20R, 18N05A24M15R, 18N05A24M20M, 18N05A24M15X, 18N05E04A05D, 18N05A24M25I, 18N05A24M15N, 18N05E04B01V, 18N05A24N21K, 18N05A24M25E, 18N05A24M15U, 18N05A24M15J, 18N05E04B01L, 18N05E04B06H, 18N05E04B06C, 18N05A24N21C, 18N05A24N21I, 18N05A24N16T, 18N05E04B06J, 18N05A24N16U, 18N05E04B07K, 18N05A24N12F, 18N05E04B07R, 18N05E04B07G, 18N05A24N22L, 18N05A24N17W, 18N05A24N17B, 18N05A24N12W, 18N05E04B02S, 18N05A24N22M, 18N05E04B07T, 18N05E04B07D, 18N05A24N22T, 18N05A24N17T, 18N05A24N12N, 18N05E04B07Z, 18N05A24N18V,'
                        , ' 18N05A24N18Q, 18N05A24N18F, 18N05A24N13W, 18N05A24N13K, 18N05A23Q22P, 18N05A23Q17E, 18N05A23Q18A, 18N05A23Q23L, 18N05A23Q18G, 18N05A23Q23X, 18N05A23Q23H, 18N05A23Q23C, 18N05A23Q18S, 18N05A23Q13I, 18N05A23Q13Z, 18N05A23Q24K, 18N05A23Q24X, 18N05A23Q19X, 18N05A23Q14W, 18N05A23Q25K, 18N05A23Q15V, 18N05A23Q15F, 18N05A23Q20R, 18N05A23Q20G, 18N05A23Q15W, 18N05A23Q25N, 18N05A23Q15Y, 18N05A23Q15T, 18N05A23Q15D, 18N05A24M21V, 18N05A24M21B, 18N05A24M16G, 18N05A24M11W, 18N05A24M11G, 18N05A24M21H, 18N05A24M16N, 18N05A24M16C, 18N05A24M16D, 18N05A24M11C, 18N05A24M21Z, 18N05A24M16P, 18N05A24M22K, 18N05A24M17V, 18N05A24M17F, 18N05A24M12G, 18N05A24M22H, 18N05A24M17X, 18N05A24M22Y, 18N05A24M22N, 18N05A24M22Z, 18N05A24M22J, 18N05A24M23A, 18N05A24M23B, 18N05A24M18Z, 18N05A24M18U, 18N05A24M18P, 18N05A24M24H, 18N05A24M19T, 18N05A24M24J, 18N05E04A05Q, 18N05A24M25F, 18N05A24M25A, 18N05A24M25W, 18N05A24M15H, 18N05A24M25Y, 18N05A24M25T, 18N05A24M25N, 18N05E04A05U, 18N05E04A05E, 18N05A24M20Z, 18N05A24N16V, 18N05A24N16Q, 18N05A24M20P, 18N05A24N16F, 18N05A24M20E, 18N05A24N11K, 18N05E04B01W, 18N05A24N16W, 18N05E04B01C, 18N05A24N21X, 18N05A24N21S, 18N05A24N16X, 18N05A24N16M, 18N05E04B01Y,'
                        , ' 18N05E04B01D, 18N05A24N21T, 18N05A24N21D, 18N05A24N21U, 18N05E04B02K, 18N05A24N17Q, 18N05A24N17F, 18N05E04B07L, 18N05E04B02B, 18N05A24N12R, 18N05E04B07M, 18N05E04B02M, 18N05A24N22H, 18N05A24N17S, 18N05A24N17M, 18N05E04B02D, 18N05A24N22Y, 18N05A24N17D, 18N05A24N12I, 18N05E04B07E, 18N05E04B02E, 18N05A24N22U, 18N05A24N22P, 18N05E04B03A, 18N05A24N23Q, 18N05A24N23K, 18N05A24N13L, 18N05A24N13G, 18N05A23Q22U, 18N05A23Q22E, 18N05A23Q12Z, 18N05A23Q23F, 18N05A23Q18V, 18N05A23Q18K, 18N05A23Q13V, 18N05A23Q23R, 18N05A23Q13H, 18N05A23Q13C, 18N05A23Q18N, 18N05A23Q13T, 18N05A23Q13D, 18N05A23Q23J, 18N05A23Q18U, 18N05A23Q18P, 18N05A23Q24V, 18N05A23Q24F, 18N05A23Q14F, 18N05A23Q24L, 18N05A23Q24G, 18N05A23Q24H, 18N05A23Q19H, 18N05A23Q14G, 18N05A23Q14B, 18N05A23Q24T, 18N05A23Q14T, 18N05A23Q24Z, 18N05A23Q24J, 18N05A23Q19P, 18N05A23Q25A, 18N05A23Q20V, 18N05A23Q20K, 18N05A23Q20A, 18N05A23Q25B, 18N05A23Q20B, 18N05A23Q20M, 18N05A23Q15M, 18N05A23Q20N, 18N05A23Q20I, 18N05A23Q20U, 18N05A23Q20P, 18N05A24M21Q, 18N05A24M21A, 18N05A24M16H, 18N05A24M11I, 18N05A24M16U, 18N05A24M16E, 18N05A24M22V, 18N05A24M12Q, 18N05A24M12A, 18N05A24M17L, 18N05A24M12W, 18N05A24M12L, 18N05A24M12S, 18N05A24M18F,'
                        , ' 18N05A24M23S, 18N05A24M23H, 18N05A24M18X, 18N05A24M18S, 18N05A24M13X, 18N05A24M23J, 18N05A24M23D, 18N05A24M18Y, 18N05A24M18N, 18N05A24M13T, 18N05A24M13U, 18N05A24M13P, 18N05E04A04K, 18N05A24M24Q, 18N05A24M24A, 18N05A24M19A, 18N05A24M19L, 18N05A24M19G, 18N05A24M19B, 18N05A24M14S, 18N05A24M14C, 18N05A24M14N, 18N05A24M24U, 18N05A24M19E, 18N05A24M15F, 18N05A24M25B, 18N05A24M20L, 18N05A24M20G, 18N05A24M20S, 18N05E04B06F, 18N05E04A05P, 18N05A24M20U, 18N05A24N11F, 18N05E04B06B, 18N05A24N16L, 18N05E04B01M, 18N05A24N21H, 18N05A24N11S, 18N05E04B06D, 18N05A24N16N, 18N05A24N11I, 18N05E04B01U, 18N05A24N21J, 18N05A24N16P, 18N05A24N11P, 18N05E04B02V, 18N05A24N22V, 18N05A24N22G, 18N05A24N22B, 18N05E04B02C, 18N05A24N17X, 18N05A24N17H, 18N05E04B07Y, 18N05E04B07N, 18N05E04B02I, 18N05A24N12T, 18N05E04B07U, 18N05A24N17U, 18N05A24N17J, 18N05A24N17E, 18N05A24N13R'];
                    //document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area11.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area11[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });
            } else if (Band == 7) {
                
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area12";
                Aviso = 1;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area12 = ['18N05A24Q23A, 18N05A24Q22J, 18N05A24Q23G, 18N05A24Q23B, 18N05A24Q18W, 18N05A24Q23H, 18N05A24Q18Y, 18N05A24Q23D, 18N05A24Q23F, 18N05A24Q18V, 18N05A24Q18X, 18N05A24Q23I, 18N05A24Q17Z, 18N05A24Q22E, 18N05A24Q23C'];

                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area12.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area12[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });


            } else if (Band == 8) {
               
                /////EL AREA ESTA ABAJO ///////
                IdArea = "007-85M";
                Aviso = 1;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var AreaNueva = ['18N05E04D09P, 18N05E04D10L, 18N05E04D10M, 18N05E04D10T, 18N05E04D10Z, 18N05E04D10U, 18N05E04D10K, 18N05E04D15D, 18N05E04D10N, 18N05E04D15E, 18N05E04D10Y, 18N05E04D10P'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < AreaNueva.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + AreaNueva[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });


            } else if (Band == 9) {
                
                /////EL AREA ESTA ABAJO ///////
                IdArea = "780-17";
                Aviso = 0;
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var AreaNueva = ['18N05A25M19J, 18N05A25M25F, 18N05A25M20F, 18N05A25M15V, 18N05E05A05G, 18N05E05A05B, 18N05A25M15B, 18N05E05A10H, 18N05E05A05M, 18N05A25M20M, 18N05A25M20V, 18N05A25M15Q, 18N05A25M15K, 18N05A25M14Z, 18N05A25M20K, 18N05A25M15F, 18N05A25M15A, 18N05A25M20G, 18N05A25M15R, 18N05E05A10M, 18N05A25M15H, 18N05A25M25K, 18N05A25M20Q, 18N05A25M20A, 18N05A25M20L, 18N05A25M15L, 18N05E05A05H, 18N05E05A05C, 18N05A25M15M, 18N05A25M19E, 18N05A25M25A, 18N05A25M20B, 18N05E05A10C, 18N05A25M25M, 18N05A25M25H, 18N05A25M15X, 18N05A25M25B, 18N05A25M20R, 18N05A25M10W, 18N05E05A05X, 18N05A25M25S, 18N05A25M20C, 18N05A25M15S, 18N05A25M15C, 18N05A25M19Z, 18N05A25M19U, 18N05A25M19P, 18N05A25M14U, 18N05A25M25W, 18N05A25M25R, 18N05A25M15G, 18N05E05A10S, 18N05E05A05S, 18N05A25M25X, 18N05A25M10X, 18N05A25M14P, 18N05A25M25L, 18N05A25M25G, 18N05A25M20W, 18N05A25M15W, 18N05A25M25C, 18N05A25M20X, 18N05A25M20S, 18N05A25M20H'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < AreaNueva.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + AreaNueva[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });


            }else if (Band == 10) {
                
                /////EL AREA ESTA ABAJO ///////
                IdArea = "OG2 Area 10";
                Aviso = 0;
                console.log(IdArea);
                //await page.waitFor(1500);
               page.evaluate(() => {

                const prueba = '18N05A24L21Q, 18N05A24L21P, 18N05A24L17W, 18N05A24L17S, 18N05A24L22J, 18N05A24L22E, 18N05A24L23K, 18N05A24Q03L, 18N05A24Q03G, 18N05A24L23C, 18N05A24Q08D, 18N05A24L24B, 18N05A24L19Y, 18N05A24Q04P, 18N05A24L24U, 18N05A24Q10H, 18N05A24Q10C, 18N05A24L25C, 18N05A24Q05Y, 18N05A24L25T, 18N05A24L20Z, 18N05A25M06A, 18N05A25M06M, 18N05A25M06B, 18N05A25I16Z, 18N05A25I22A, 18N05A25M07H, 18N05A25I22H, 18N05A25I23Q, 18N05A25M08N, 18N05A25M09M, 18N05A24L21N, 18N05A24L21U, 18N05A24L22M, 18N05A24L22H, 18N05A24L22C, 18N05A24L22D, 18N05A24L22U, 18N05A24L23F, 18N05A24L18V, 18N05A24Q03W, 18N05A24L23B, 18N05A24Q03S, 18N05A24Q03M, 18N05A24Q03H, 18N05A24L23M, 18N05A24Q03D, 18N05A24Q08J, 18N05A24Q03P, 18N05A24Q03E, 18N05A24L23U, 18N05A24L18Z, 18N05A24L24A, 18N05A24L24T, 18N05A24Q05Q, 18N05A24L25S, 18N05A24L25I, 18N05A24L25D, 18N05A24L25J, 18N05A25M06K, 18N05A25I16V, 18N05A25I16Y, 18N05A25I21E, 18N05A25I22B, 18N05A25I17W, 18N05A25M07N, 18N05A25M07I, 18N05A25I22T, 18N05A24L22K, 18N05A24L21E, 18N05A24L22G, 18N05A24L17Z, 18N05A24L23R, 18N05A24L23G, 18N05A24Q08C, 18N05A24Q03I, 18N05A24L23I, 18N05A24L23Z, 18N05A24L23J, 18N05A24Q09A, 18N05A24Q04Q, 18N05A24Q04R, 18N05A24Q04G, 18N05A24L24F, 18N05A24L19W, 18N05A24L24H, 18N05A24Q04E, 18N05A24Q05R, 18N05A24Q10D, 18N05A24L25E, 18N05A25M06F, 18N05A25M06H, 18N05A25I21H,';
                const prueba2 = '18N05A25M06N, 18N05A25I21D, 18N05A25I22Q, 18N05A25I22M, 18N05A25I22C, 18N05A25I17Z, 18N05A25M08P, 18N05A24L23Q, 18N05A24L23A, 18N05A24Q08H, 18N05A24Q03X, 18N05A24Q03C, 18N05A24L23Y, 18N05A24Q03Z, 18N05A24Q03U, 18N05A24Q03J, 18N05A24Q04B, 18N05A24L24R, 18N05A24Q04H, 18N05A24L19X, 18N05A24L24E, 18N05A24L25F, 18N05A24L25G, 18N05A24Q05X, 18N05A24Q10I, 18N05A24Q10E, 18N05A24L25P, 18N05A25I21K, 18N05A25I21A, 18N05A25I21T, 18N05A25I21N, 18N05A25I17Y, 18N05A24L21R, 18N05A24L21J, 18N05A24L22L, 18N05A24L22B, 18N05A24Q03R, 18N05A24Q08I, 18N05A24Q03Y, 18N05A24Q03T, 18N05A24Q03N, 18N05A24L23N, 18N05A24Q08E, 18N05A24L23P, 18N05A24L23E, 18N05A24Q04L, 18N05A24L24V, 18N05A24L24Q, 18N05A24L24K, 18N05A24L24X, 18N05A24L24C, 18N05A24Q04D, 18N05A24L24Y, 18N05A24L24D, 18N05A24L20V, 18N05A24L25R, 18N05A24L25L, 18N05A24L25N, 18N05A24L25U, 18N05A25M06L, 18N05A25M06G, 18N05A25I21M, 18N05A25I21G, 18N05A25I21P, 18N05A25I21J, 18N05A25M07K, 18N05A25I17X, 18N05A25I22N, 18N05A25M09L, 18N05A24L21M, 18N05A24L21T, 18N05A24L22N, 18N05A24L22I, 18N05A24L17Y, 18N05A24Q08G, 18N05A24Q08B, 18N05A24L23L, 18N05A24L18W, 18N05A24L23X, 18N05A24L18X, 18N05A24Q04A, 18N05A24L19V, 18N05A24L24I, 18N05A24Q05K, 18N05A24L25Q, 18N05A24L20W, 18N05A24L25M, 18N05A24L20Y, 18N05A25I21Q, 18N05A25I21F, 18N05A25I22K, 18N05A25M07G, 18N05A25I22R, 18N05A25I22S,';
                const prueba3 = '18N05A25I22I, 18N05A25I22P, 18N05A25I22E, 18N05A25I23F, 18N05A25M08M, 18N05A25M09K, 18N05A24L21I, 18N05A24L22F, 18N05A24L17X, 18N05A24L17T, 18N05A24Q03B, 18N05A24L23W, 18N05A24L23H, 18N05A24L18Y, 18N05A24Q04V, 18N05A24Q04F, 18N05A24L24W, 18N05A24Q04C, 18N05A24L24N, 18N05A24Q04J, 18N05A24L24P, 18N05A24Q05V, 18N05A24L25A, 18N05A24Q05S, 18N05A24Q10P, 18N05A25I21R, 18N05A25I21S, 18N05A25I21B, 18N05A25I16X, 18N05A25M06P, 18N05A25I22F, 18N05A25I17V, 18N05A25M07L, 18N05A25I22D, 18N05A25I22J, 18N05A25I23K, 18N05A25M09N, 18N05A24L21L, 18N05A24L21S, 18N05A24L22A, 18N05A24L22P, 18N05A24L23S, 18N05A24L23T, 18N05A24L23D, 18N05A24Q04K, 18N05A24L24L, 18N05A24L24G, 18N05A24L24S, 18N05A24L24M, 18N05A24L24J, 18N05A24L19Z, 18N05A24Q05F, 18N05A24L25K, 18N05A24Q10B, 18N05A24Q05W, 18N05A24Q05L, 18N05A24L25B, 18N05A24L25H, 18N05A24L20X, 18N05A24Q10J, 18N05A25I21L, 18N05A25I21C, 18N05A25I16W, 18N05A25I21I, 18N05A25I21U, 18N05A25I22L, 18N05A25I22G, 18N05A25M07M, 18N05A25M07P, 18N05A25I22U, 18N05A25M08K, 18N05A25I23A, 18N05A25I18V, 18N05A25M08L';





                document.querySelector('[id="cellIdsTxtId"]').value = prueba + prueba2 + prueba3;
                angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');

                 });


            }




            const continCeldas = await page.$x('//span[contains(.,"Continuar")]');
            await continCeldas[1].click();

            await page.waitFor(3000);

            const Todoslosparametros = await page.$$eval("span", links =>
                links.map(link => link.textContent)
            );
            var cont = 1;
            for (let i = 0; i < Todoslosparametros.length; i++) {
                const elemento = Todoslosparametros[i];
                if (elemento == "Vea los errores a continuación (dentro de las pestañas):") {
                    cont = 0;
                }

            }
            const FechaReapertura = await page.$$eval("a", links =>
                links.map(link => link.textContent)
            );
            var Reapertura = 0;
            //EL DIA DE MAÑANA 12 04 2022 SE REALIZARA LA PRUEBA 
            //PARA ASI VALIDAR CUANDO APAREZCA ALGO DIFERENTE A "Las siguientes celdas de selección no están disponibles:"

            for (let i = 0; i < FechaReapertura.length; i++) {


                var Text = FechaReapertura[i].substring(24, 120);
                if (Text == "Las siguientes celdas de selección no están disponibles ya que la fecha de reapertura es futura:") {
                    console.log("Lo encontre");
                    Reapertura = 1;
                    contreapertura++;
                    if (contreapertura < 2) {
                        Correo(3, IdArea);
                    }


                    console.log(contreapertura);
                } else {
                    var Text = FechaReapertura[i].substring(24, 140);
                }

            }




            if (cont == "0") {
                console.log("Limpio El campo del area");
                page.evaluate(() => {
                    document.querySelector('[id="cellIdsTxtId"]').value = "";
                });
                Band++;
                //Este es la cantidad de areas mas 1 
                if (Band == 11) {
                    Band = 1;
                }

            } else {
                Band = 99;
            }
            clearTimeout(TimeArea);
        }
        console.log("ahhh se salio Y_Y ");
        var bandera = 0;
        var Fin = 0; 
        let TimeNOpaso = setTimeout(() => {
            bandera = 99;
            console.log("ENTRO EN EL TimeNOpaso");
            page.close();
            Mineria(browser, Indicador, Pin);
            Fin = 1;
        }, 20000);
       //await page.waitForSelector('select[id="submitterPersonOrganizationNameId"]');
       //await page.waitForSelector('//a[contains(.,"área")]');
       console.log(page.url());
       /* await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });*/
        //await page.waitFor(2000);
       
       if(Aviso = 0){
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
       }else{
        //clearTimeout(TimeNOpaso);
        
        while(bandera != 99){
            
           // Fin++;
            await page.waitFor(500);
            console.log(page.url());
            if(page.url() == 'https://annamineria.anm.gov.co/sigm/index.html#/p_CaaIataInputTechnicalEconomicalDetails'){
                bandera =99;
                Fin = 0; 
            console.log("Si cargo la pagina  ");
            }else{
                
                console.log("Nada no la carga ");
            }

            /*if(Fin==30){
                bandera = 99;
                console.log("ENTRO EN EL TimeNOpaso");
                page.close();
                Mineria(browser, Indicador, Pin);
                break;
            }*/
        
        }
       }
       
        
        clearTimeout(TimeNOpaso);


if(Fin != 1){
    var radicacion = '0';
    let RadiPrimero = setTimeout(() => {
        if (radicacion == '0') {
            console.log("ENTRO EN EL RadiPrimero");
            page.close();
             Mineria(browser, Indicador, Pin);
        }

    }, 40000);
}
        


        const continDetallesdelArea2 = await page.$x('//a[contains(.,"área")]');
        await continDetallesdelArea2[4].click();

        const grupoEtnicoYN = await page.$('input[value="N"]');
        await grupoEtnicoYN.click();


        const btnInfoTecnica = await page.$x('//a[contains(.,"Información t")]');
        await btnInfoTecnica[0].click();

        //CORREO LIBERADA
        Correo(1, IdArea);




        await page.evaluate(() => {

            document.querySelector('[id="yearOfExecutionId0"]').value = 'number:1'

            angular.element(document.getElementById('yearOfExecutionId0')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId0"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId0')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId0"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId0')).triggerHandler('change');

            //Contactos con la comunidad y enfoque social 

            document.querySelector('[id="yearOfExecutionId1"]').value = 'number:1'

            angular.element(document.getElementById('yearOfExecutionId1')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId1"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId1')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId1"]').value = 'TSCA'

            angular.element(document.getElementById('laborSuitabilityId1')).triggerHandler('change');

            //Base topográfica del área 	

            document.querySelector('[id="yearOfExecutionId2"]').value = 'number:1'

            angular.element(document.getElementById('yearOfExecutionId2')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId2"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId2')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId2"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId2')).triggerHandler('change');

            //Cartografía geológica 	

            document.querySelector('[id="yearOfExecutionId3"]').value = 'number:1'

            angular.element(document.getElementById('yearOfExecutionId3')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId3"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId3')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId3"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId3')).triggerHandler('change');

            //Excavación de trincheras y apiques 	

            document.querySelector('[id="yearOfExecutionId4"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId4')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId4"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId4')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId4"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId4')).triggerHandler('change');

            //Geoquímica y otros análisis 	

            document.querySelector('[id="yearOfExecutionId5"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId5')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId5"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId5')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId5"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId5')).triggerHandler('change');

            //Geofísica 

            document.querySelector('[id="yearOfExecutionId6"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId6')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId6"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId6')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId6"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId6')).triggerHandler('change');

            //Estudio de dinámica fluvial del cauce	

            document.querySelector('[id="yearOfExecutionId7"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId7')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId7"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId7')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId7"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId7')).triggerHandler('change');

            // Características hidrológicas y sedimentológicas del cauce	

            document.querySelector('[id="yearOfExecutionId8"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId8')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId8"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId8')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId8"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId8')).triggerHandler('change');

            //Pozos y Galerías Exploratorias	

            document.querySelector('[id="yearOfExecutionId9"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId9')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId9"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId9')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId9"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId9')).triggerHandler('change');

            //Perforaciones profundas 	

            document.querySelector('[id="yearOfExecutionId10"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId10')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId10"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId10')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId10"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId10')).triggerHandler('change');

            //Muestreo y análisis de calidad 	

            document.querySelector('[id="yearOfExecutionId11"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId11')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId11"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId11')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId11"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId11')).triggerHandler('change');

            //Estudio geotécnico 	

            document.querySelector('[id="yearOfExecutionId12"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId12')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId12"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId12')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId12"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId12')).triggerHandler('change');

            //Estudio Hidrológico 	

            document.querySelector('[id="yearOfExecutionId13"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId13')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId13"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId13')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId13"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId13')).triggerHandler('change');

            //Estudio Hidrogeológico 	

            document.querySelector('[id="yearOfExecutionId14"]').value = 'number:2'

            angular.element(document.getElementById('yearOfExecutionId14')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId14"]').value = 'number:2'

            angular.element(document.getElementById('yearOfDeliveryId14')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId14"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId14')).triggerHandler('change');

            //Evaluación del modelo geológico 	

            document.querySelector('[id="yearOfExecutionId15"]').value = 'number:3'

            angular.element(document.getElementById('yearOfExecutionId15')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId15"]').value = 'number:3'

            angular.element(document.getElementById('yearOfDeliveryId15')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId15"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId15')).triggerHandler('change');

            //Actividades exploratorias adicionales (Se describe en el anexo Tecnico que se allegue)	

            document.querySelector('[id="yearOfExecutionId16"]').value = 'number:3'

            angular.element(document.getElementById('yearOfExecutionId16')).triggerHandler('change');

            document.querySelector('[id="yearOfDeliveryId16"]').value = 'number:3'

            angular.element(document.getElementById('yearOfDeliveryId16')).triggerHandler('change');

            document.querySelector('[id="laborSuitabilityId16"]').value = 'IIG'

            angular.element(document.getElementById('laborSuitabilityId16')).triggerHandler('change');



            // Actividades Ambientales etapa de exploración


            //Selección optima de Sitios de Campamentos y Helipuertos 	

            angular.element(document.getElementById('envYearOfDeliveryId0')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId0"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId0')).triggerHandler('change');

            //Manejo de Aguas Lluvias 	


            angular.element(document.getElementById('envYearOfDeliveryId1')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId1"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId1')).triggerHandler('change');

            //Manejo de Aguas Residuales Domesticas 	


            angular.element(document.getElementById('envYearOfDeliveryId2')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId2"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId2')).triggerHandler('change');

            //Manejo de Cuerpos de Agua 	

            angular.element(document.getElementById('envYearOfDeliveryId3')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId3"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId3')).triggerHandler('change');

            //Manejo de Material Particulado y Gases 	


            angular.element(document.getElementById('envYearOfDeliveryId4')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId4"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId4')).triggerHandler('change');

            //Manejo del Ruido 	


            angular.element(document.getElementById('envYearOfDeliveryId5')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId5"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId5')).triggerHandler('change');

            // Manejo de Combustibles 	

            angular.element(document.getElementById('envYearOfDeliveryId6')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId6"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId6')).triggerHandler('change');

            //Manejo de Taludes 	


            angular.element(document.getElementById('envYearOfDeliveryId7')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId7"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId7')).triggerHandler('change');

            //Manejo de Accesos 	


            angular.element(document.getElementById('envYearOfDeliveryId8')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId8"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId8')).triggerHandler('change');

            // Manejo de Residuos Solidos 	

            angular.element(document.getElementById('envYearOfDeliveryId9')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId9"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId9')).triggerHandler('change');

            //Adecuación y Recuperación de Sitios de Uso Temporal 	


            angular.element(document.getElementById('envYearOfDeliveryId10')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId10"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId10')).triggerHandler('change');

            //Manejo de Fauna y Flora 	


            angular.element(document.getElementById('envYearOfDeliveryId11')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId11"]').value = 'IFEB'

            angular.element(document.getElementById('envLaborSuitabilityId11')).triggerHandler('change');

            //Plan de Gestión Social 	


            angular.element(document.getElementById('envYearOfDeliveryId12')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId12"]').value = 'TSCA'

            angular.element(document.getElementById('envLaborSuitabilityId12')).triggerHandler('change');

            //capacitación de Personal 	


            angular.element(document.getElementById('envYearOfDeliveryId13')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId13"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId13')).triggerHandler('change');

            //Contratación de Mano de Obra no Calificada 	


            angular.element(document.getElementById('envYearOfDeliveryId14')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId14"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId14')).triggerHandler('change');

            //Rescate Arqueológico 	


            angular.element(document.getElementById('envYearOfDeliveryId15')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId15"]').value = 'ARQ'

            angular.element(document.getElementById('envLaborSuitabilityId15')).triggerHandler('change');

            //Manejo de Hundimientos	


            angular.element(document.getElementById('envYearOfDeliveryId16')).triggerHandler('change');

            document.querySelector('[id="envLaborSuitabilityId16"]').value = 'MULT'

            angular.element(document.getElementById('envLaborSuitabilityId16')).triggerHandler('change');


        });

        const selectTipoprofesion = await page.$('select[id="techProfessionalDesignationId"]');
        await selectTipoprofesion.type('Geólogo');
        const selectprofesional = await page.$('select[id="techApplicantNameId"]');
        await selectprofesional.type('Oscar Javier Pinilla Reyes (73619)');
        await page.waitFor(100);
        const addProfesional = await page.$x('//span[contains(.,"Agregar")]');
        await addProfesional[0].click();

        await page.click('#technicalCheckboxId');

        const btnInfoEconomica = await page.$x('//a[contains(.,"Información eco")]');
        await btnInfoEconomica[0].click();

        console.log('48. Selección de contador');

        const selectContador = await page.$('select[id="ecoProfessionalDesignationId"]');
        await selectContador.type('Contador');
        const selectprofContador = await page.$('select[id="ecoApplicantNameId"]');
        await selectprofContador.type('Andres Felipe Cadavid Montoya (79033)');
        await page.waitFor(100);
        const addContador = await page.$x('//span[contains(.,"Agregar")]');
        await addContador[1].click();

        console.log('49. Selección de valores');

        await page.evaluate(() => {

            // Check
            document.querySelector('Input[id="declareIndId0"]').click();

            //Valores
            document.getElementById('currentAssetId0').value = '7993136472'

            angular.element(document.getElementById('currentAssetId0')).triggerHandler('change');

            document.getElementById('currentLiabilitiesId0').value = '1278692939'

            angular.element(document.getElementById('currentLiabilitiesId0')).triggerHandler('change');

            document.getElementById('totalAssetId0').value = '8633509696'

            angular.element(document.getElementById('totalAssetId0')).triggerHandler('change');

            document.getElementById('totalLiabilitiesId0').value = '1641827789'

            angular.element(document.getElementById('totalLiabilitiesId0')).triggerHandler('change');


        });



        const continPag4 = await page.$x('//span[contains(.,"Continuar")]');
        await continPag4[1].click();

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
        console.log(" si navego ");

        //try {
        console.log('51. Bóton Radicar');

        await page.waitFor(500);
        const btnRadicar1 = await page.$x('//span[contains(.,"Radicar")]');
        console.log("Este es el boton radicar : " + btnRadicar1);

        //await page.waitFor(4000);
        console.log("Le di click");
        // await page.waitFor(4000);
        try {
            await btnRadicar1[0].click();
        } catch (exepcion) {
            console.log("La pos 0 No fue ")
        }
        try {

            await btnRadicar1[1].click();
        } catch (exepcion) {
            console.log("La 1 tampoco Y_Y")
        }
        radicacion = '1';
        //CORREO RADICACION
        Correo(2, IdArea);

        clearTimeout(RadiPrimero);
        await page.waitFor(20000);
         Mineria(browser, Indicador, Pin);







    })();
}
function Correo(Tipo, Area) {
    // 1. Liberada 2. radicada 3. Fecha reapertura
    var msg = "";
    if (Tipo == 1) {
        msg = "Posible Area Liberada!!!!! Collective " + Area + " .Verificar!!!!.";
    } else if (Tipo == 2) {
        msg = "Posible Area Radicada!!!!! Collective  " + Area + " .Verificar!!!!.";
    } else if (Tipo == 3) {
        msg = "Area Con fecha de Reapertura!!!!! Collective  " + Area + " .Verificar!!!!.";
    }

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        host: "mail.ceere.net", // hostname
        secureConnection: false, 
        port: 465, 
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'pruebacitas@ceere.net',
            pass: '1998Ceere*'
        }
    });
    var mensaje = msg;
    var mailOptions = {
        from: mensaje + '"Our Code World " <pruebacitas@ceere.net>', //Deje eso quieto Outlook porne demasiados problemas 
        to: 'jorgecalle@hotmail.com, jorgecaller@gmail.com, alexisaza@hotmail.com, gmcalle@yahoo.com, ceereweb@gmail.com, Fernando.pala.99@gmail.com,, soportee4@gmail.com, soporte.ceere06068@gmail.com, activosmineroscolombia@gmail.com, amrb216@gmail.com',
        //to: ' ceereweb@gmail.com, Fernando.pala.99@gmail.com',
        subject: 'LA AREA ES --> ' + Area,
        text: 'LA AREA ES -->  ' + Area,
        html: 'LA AREA ES -->  ' + Area // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
    });
    /*
        var nodemailer = require('nodemailer');
    
        //Creamos el objeto de transporte
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mineriaceere@gmail.com',
                pass: 'Ceere2018'
            }
        });
    
        var mensaje = msg;
    
        var mailOptions = {
            from: 'mineriaceere@gmail.com',
            //to: 'jorgecalle@hotmail.com, jorgecaller@gmail.com, alexisaza@hotmail.com, gmcalle@yahoo.com, ceereweb@gmail.com, Fernando.pala.99@gmail.com,, soportee4@gmail.com, soporte.ceere06068@gmail.com, activosmineroscolombia@gmail.com, amrb216@gmail.com',
            to: ' ceereweb@gmail.com, Fernando.pala.99@gmail.com,',
            subject: 'Area ' + Area,
            text: mensaje
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    */



}


/*
    Fj Suarez


    //////////////////		/////////////////////			
    /////			             /////	
    //////////////		        /////	
    /////			           /////	
    /////		        ////  /////	
    /////		        //// /////	
    /////                //////      


*/

