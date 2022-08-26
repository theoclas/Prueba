const { connect } = require('http2');
const puppeteer = require('puppeteer');
var mysql = require('mysql');
const fs = require('fs');
//var Pin = "20220606145518, 06/JUL/2022";
var user1 = '74025';
var pass1 = 'Provenza2022+';
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
            if(Pines.substring(i+1,i+4) =='Po:'){
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

            await page.type('#submitterPersonOrganizationNameId', '74025');
            //await page.type('#submitterPersonOrganizationNameId', '');

            await page.waitFor(3000);

            await page.keyboard.press("Enter");

            await page.waitFor(550);
        }

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



            console.log("Limpio El campo del area")
            page.evaluate(() => {
                document.querySelector('[id="cellIdsTxtId"]').value = "";
            });

           if (Band == 1) {
            Aviso = 1;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area12";
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
            } else if (Band == 2) {

                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area13";
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {

                    var Area13 = ['18N05A24K01G, 18N05A24G21R, 18N05A24K01S, 18N05A24K01J, 18N05A24G21U, 18N05A24G22Q, 18N05A24G22Y, 18N05A24G22S, 18N05A24K02Z, 18N05A24K03F, 18N05A24K01L, 18N05A24G21W, 18N05A24K01T, 18N05A24G21Z, 18N05A24K02F, 18N05A24K02G, 18N05A24G22W, 18N05A24K02T, 18N05A24K02P, 18N05A24K02J, 18N05A24G22Z, 18N05A24K03Q, 18N05A24K03A, 18N05A24K01X, 18N05A24G21S, 18N05A24K01Z, 18N05A24K01P, 18N05A24K02V, 18N05A24K02W, 18N05A24K02B, 18N05A24K02C, 18N05A24K01H, 18N05A24K01Y, 18N05A24K01N, 18N05A24G21Y, 18N05A24G21T, 18N05A24K01U, 18N05A24K02K, 18N05A24G22V, 18N05A24G22R, 18N05A24K02Y, 18N05A24K02S, 18N05A24K02N, 18N05A24K02H, 18N05A24G22X, 18N05A24G22T, 18N05A24G21L, 18N05A24K01C, 18N05A24G21N, 18N05A24K02Q, 18N05A24K02R, 18N05A24K02L, 18N05A24K02M, 18N05A24K03V, 18N05A24G23V, 18N05A24K01B, 18N05A24K01D, 18N05A24K02A, 18N05A24K02I, 18N05A24K02U, 18N05A24G22U, 18N05A24G23Q, 18N05A24G21X, 18N05A24G21M, 18N05A24K02D, 18N05A24K03K, 18N05A24K01R, 18N05A24K01M, 18N05A24K01I, 18N05A24K01E, 18N05A24K02X, 18N05A24K02E'];
                    //document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area13.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area13[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });
            } else if (Band == 3) {
                Aviso = 0;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area14";
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area14 = ['18N05A25G21R, 18N05A25G16L, 18N05A25G21S, 18N05A25G21T, 18N05A25G21J, 18N05A25G16U, 18N05A25G22Q, 18N05A25G22A, 18N05A25G17W, 18N05A25G17S, 18N05A25G22T, 18N05A25G23F, 18N05A25G23A, 18N05A25G16P, 18N05A25G22K, 18N05A25G17V, 18N05A25G22H, 18N05A25G22C, 18N05A25G17H, 18N05A25G17Y, 18N05A25G22J, 18N05A25G22E, 18N05A25G17Z, 18N05A25G17P, 18N05A25G16X, 18N05A25G16M, 18N05A25G16Y, 18N05A25G22F, 18N05A25G22N, 18N05A25G22P, 18N05A25G23K, 18N05A25G21L, 18N05A25G16W, 18N05A25G21C, 18N05A25G16S, 18N05A25G21I, 18N05A25G16T, 18N05A25G16I, 18N05A25G21U, 18N05A25G21E, 18N05A25G17X, 18N05A25G17G, 18N05A25G17T, 18N05A25G17U, 18N05A25G18V, 18N05A25G18Q, 18N05A25G21M, 18N05A25G21P, 18N05A25G16J, 18N05A25G17K, 18N05A25G17J, 18N05A25G21H, 18N05A25G16N, 18N05A25G22R, 18N05A25G22S, 18N05A25G22B, 18N05A25G17N, 18N05A25G18K, 18N05A25G21N, 18N05A25G21D, 18N05A25G16Z, 18N05A25G17F, 18N05A25G17R, 18N05A25G17M, 18N05A25G22I, 18N05A25G22D, 18N05A25G22U, 18N05A25G18F, 18N05A25G21G, 18N05A25G21B, 18N05A25G16H, 18N05A25G17Q, 18N05A25G22L, 18N05A25G22M, 18N05A25G22G, 18N05A25G17L, 18N05A25G17I, 18N05A25G23Q'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area14.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area14[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });

            } else if (Band == 4) {
                Aviso = 1;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area15";
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area15 = ['18N05E04D09H, 18N05E04D09S, 18N05E04D09M'];
                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area15.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area15[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });


            } else if (Band == 5) {
                Aviso = 1;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "Area18";
                console.log(IdArea);
                //await page.waitFor(1500);
                page.evaluate(() => {
                    var Area18 = ['18N05E04D06M'];

                    // document.querySelector('[id="cellIdsTxtId"]').value = "";
                    for (let i = 0; i < Area18.length; i++) {
                        document.querySelector('[id="cellIdsTxtId"]').value = document.querySelector('[id="cellIdsTxtId"]').value + Area18[i];
                    }
                    angular.element(document.getElementById('cellIdsTxtId')).triggerHandler('change');
                });

            } else if (Band == 6) {
                Aviso = 1;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "007-85M";
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


            }else if (Band == 7) {
                Aviso = 1;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "780-17";
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


            }else if (Band == 8) {
                Aviso = 0;
                /////EL AREA ESTA ABAJO ///////
                IdArea = "OG2 Area 10";
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
                if (Band == 9) {
                    Band = 1;
                }

            } else {
                Band = 99;
            }
            console.log("limpia el timer");
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

        page.setDefaultTimeout(0);

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
        msg = "Posible Area Liberada!!!!! Provenza " + Area + " .Verificar!!!!.";
    } else if (Tipo == 2) {
        msg = "Posible Area Radicada!!!!! Provenza  " + Area + " .Verificar!!!!.";
    } else if (Tipo == 3) {
        msg = "Area Con fecha de Reapertura!!!!! Provenza  " + Area + " .Verificar!!!!.";
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
        from: mensaje + '"Our Code World " <pruebacitas@ceere.net>' , //Deje eso quieto Outlook porne demasiados problemas
        to: 'jorgecalle@hotmail.com, jorgecaller@gmail.com, alexisaza@hotmail.com, gmcalle@yahoo.com, ceereweb@gmail.com, Fernando.pala.99@gmail.com,, soportee4@gmail.com, soporte.ceere06068@gmail.com, activosmineroscolombia@gmail.com, amrb216@gmail.com',
        //to: ' ceereweb@gmail.com, Fernando.pala.99@gmail.com,',
        subject: 'LA AREA ES --> ' + Area,
        text: 'LA AREA ES -->  ' + Area,
        html: 'LA AREA ES -->  ' + Area // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
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