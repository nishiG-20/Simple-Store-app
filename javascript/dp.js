showNavbar()

function showNavbar() {
    let makeTheNavbar = makeNavbar()
    let navbar = document.getElementById('navbar')
    navbar.innerHTML = makeTheNavbar
}

function makeNavbar() {
    let navbar = `                
                 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                 <div class="container-fluid">
                     <a class="navbar-brand">Store App</a>
                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                         aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showProducts()">Show Products</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showForm()">Add a Products</a>
                                 </li>
                                  <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showProducts2()">Show products-2</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="ShowPurchaseForm()">Purchase</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showStocks()">Stocks</a>
                                 </li>
                         </ul>
                     </div>
                 </div>
                 </nav>
               `
    return navbar
}



let products = [
    { product: 'Pepsi', price: 25, discount: '0', supplier: 'Bob Inc.', delivery: true },
    { product: 'Dairy Milk', price: 40, discount: '5', supplier: 'ABC Limited', delivery: false },
    { product: 'Colgate', price: 80, discount: '2', supplier: 'James & C0.', delivery: true },
    { product: 'Maggi', price: 15, discount: '5', supplier: 'ABC Limited', delivery: true },
    { product: 'Snickers', price: 50, discount: '2', supplier: 'James & C0.', delivery: false },
    { product: 'Nescafe', price: 10, discount: '0', supplier: 'Bob Inc.', delivery: false }
]

//Create Product ,price and Supplier s/p arr
let products2 = products.map(b => {
    const { product, price, supplier } = b
    return { product: product, price: price, supplier: supplier }
})



let discountOptions = [
    { display: '2%', value: '2' },
    { display: '5%', value: '5' },
    { display: 'None', value: '0' }
]

let suppliers = ['ABC Limited', 'James & C0.', 'Bob Inc.']

let editIndex = -1

let myproduct = {}

let errors = {}


function showProducts() {
    let show = document.getElementById('show')
    show.innerHTML = ''

    editIndex = -1

    myproduct = {}

    let insertTable = document.getElementById('insertTable')
    let showTheTable = showTable()
    insertTable.innerHTML = showTheTable
}


function showTable() {
    const mainHeading = `<h1 class="text-center">List Of Product</h1>`
    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col"  class="hv" onclick="sortByProduct()">Product</th>
                                 <th scope="col"  class="hv" onclick="sortByPrice()">Price</th>
                                 <th scope="col"  class="hv" onclick="sortByDiscount()">Discount</th>
                                 <th scope="col"  class="hv" onclick="sortBySupplier()">Supplier</th>
                                 <th scope="col">Delivery</th>
                                 <th></th>
                                 <th></th>
                             </tr>
                         </thead>
                          `
    const tableBody = products.map((prdt, index) => {
        const { product, price, discount, supplier, delivery } = prdt
        return `
                <tr>
                    <td>${product}</td>
                    <td>${price}</td>
                    <td>${discount}</td>
                    <td>${supplier}</td>
                    <td>${delivery}</td>
                    <td><button type="submit" class="btn btn-secondary" onclick="editForm(${index})">Edit</button></td>
                    <td><button type="submit" class="btn btn-danger " onclick="deleteRow(${index})">Delete</button></td>
                </tr>
                `
    })

    return `${mainHeading} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>`
}

function deleteRow(index) {
    products.splice(index, 1)
    showProducts()
}

function editForm(index) {
    editIndex = index
    myproduct = products[editIndex]
    showForm()
}

function showProducts2() {
    let show = document.getElementById('show')
    show.innerHTML = ''

    let insertTable = document.getElementById('insertTable')
    let showTheTable = showTable2()
    insertTable.innerHTML = showTheTable
}


function showTable2() {
    const mainHeading = `<h1 class="text-center">List Of Products-2</h1>`

    const tableBody = products.map(prdt => {
        const { product, price, discount, supplier, delivery } = prdt
        return `
                <div class="col-4 bdr">
                    <span class="redColor">Product:</span> ${product}</br>
                    <span class="redColor">Price:</span>   ${price}</br>
                    <span class="redColor">Discount:</span>${discount}</br>
                    <span class="redColor">Supplier:</span>${supplier}</br>
                    <span class="redColor">Delivery:</span>${delivery}
                </div>
              `
    })


    const cmpltTable = `
                         <div class="container">
                              <div class="row align-items-start">
                                ${tableBody.join('')}
                              </div> 
                         </div>
                       `
    return `${mainHeading}${cmpltTable}`
}


function showForm() {

    let { product = '', price = '', discount = '', supplier = '', delivery = false } = myproduct

    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let tableHeading = (editIndex >= 0) ? 'Edit Product Details' : 'Add a Product'

    let hd = `<h1 align="center">${tableHeading}</h1>`

    let productName = makeTextField("productName", "Product name", "Enter Product Name", product, errors.product)

    let prc = makeTextField("Price", "Price", "Enter Price", price, errors.price)

    let makeTheRadio = makeRadio(discountOptions, 'Discount', 'radioBtn', discount, errors.discount)
    let makeTheDropDown = makeDropDown('delivery', suppliers, 'Select delivery options', supplier, errors.supplier)
    let makeTheChkBox = makeCheckbox('supplier', 'Delivery Available', delivery)

    let submitBtn = `<button type="submit" class="btn btn-primary fix-size" onclick="submitForm()">Submit</button>`
    let completeForm = `${hd}${productName}${prc}${makeTheRadio}${makeTheDropDown}${makeTheChkBox}${submitBtn}`
    let show = document.getElementById('show')
    show.innerHTML = completeForm
}


function makeTextField(id, label, placeholder = '', value = '', err = '') {
    let disable = (editIndex >= 0 && id === 'productName') ? 'readonly' : ''
    let disable2 = (editIndex2 >= 0 && id === 'prId') ? 'readonly' : ''
    let str = err ? `<span class="text-danger">${err}</span>` : ''
    let textField = `
                     <div class="mb-3 fix-size">
                       <label>${label}</label>
                            <input placeholder="${placeholder}" type="text" class="form-control"  id="${id}" value="${value}" ${disable} ${disable2} required>
                             ${str}
                      </div>
                   `
    return textField
}


function makeRadio(arr, label, name, discountValue = '', err = '') {

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    const arr1 = arr.map(opt => {
        let { display, value } = opt
        let checked = (discountValue === value) ? 'checked' : ''
        let str = `
                 <div class="form-check form-check-inline">
                     <input class="form-check-input" type="radio" value="${value}"  name="${name}"  ${checked}>
                     <label class="form-check-label">
                         ${display}
                     </label>
                 </div>
                `
        return str
    })

    let labelHd = ` <div class="form-check form-check-inline">
                        <label class="form-check-label">
                            ${label}:
                        </label>
                    </div>
                  `
    let completeRadio = `${labelHd} ${arr1.join('')}`
    return `${completeRadio}${str1}`
}


function makeDropDown(id, options, header, supplier = '', err = '') {

    let str1 = err ? `<span class="text-danger fix-size">${err}</span>` : ''


    let dpDownBody = options.map(opt => {
        let selected = (opt === supplier) ? 'selected' : ''
        return `<option ${selected}>${opt}</option>`
    })

    let dpDownHeader = (supplier) ? '' : 'selected'

    dpheader = `<option disabled ${dpDownHeader}>${header}</option>`

    let cmpltDpDown = `
                   <div class="form-group fix-size" >
                       <select id="${id}" class="form-control">
                           ${dpheader}
                           ${dpDownBody.join('')}
                       <select>
                   </div> `

    return cmpltDpDown + str1
}


function makeCheckbox(id, label, delivery = '') {
    let checked = (delivery) ? 'checked' : ''
    let chkBox = `
               <div class="form-check fix-size">
                   <input class="form-check-input" type="checkbox" id="${id}" ${checked}>
                   <label class="form-check-label" for="${id}">
                       ${label}
                   </label>
               </div>
               `
    return chkBox
}


function submitForm() {
    let product = document.getElementById('productName').value
    let price = document.getElementById('Price').value
    let supplier = document.getElementById('delivery').value
    let delivery = document.getElementById('supplier').checked
    let radio = document.getElementsByName('radioBtn')
    let discount = ''
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            discount = radio[i].value
        }
    }

    let item = {}
    item.product = product
    item.price = price
    item.discount = discount
    item.supplier = supplier
    item.delivery = delivery

    if (validate(item)) {
        (editIndex >= 0) ? (products[editIndex] = item) : products.push(item)
        showProducts()
    }
    else {
        myproduct = item
        showForm()
    }
}

function validate(item) {

    //Validate Product Name
    errors.product = (item.product) ? '' : 'Product name is Mandatory'
    if (!errors.product && editIndex < 0) {
        //Find Index
        let index = products.findIndex(prod => {
            return prod.product === item.product
        })
        errors.product = (index === -1) ? '' : 'Product Name Exists, Enter Diffrent Product Name'
    }

    errors.price = (+item.price) ? '' : 'Enter The Correct Price'
    errors.discount = item.discount ? '' : 'Choose The Discount'

    //validate Supplier
    let splr = item.supplier
    let index = suppliers.findIndex(sup => sup === splr)

    errors.supplier = (index !== -1) ? '' : 'Select The Supplier'

    return !(errors.product || errors.price || errors.discount || errors.supplier)
}

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------Add purchase And Stock ---------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
let purchaseForm = [
    { purchaseId: 'PUR001', product: 'Pepsi', qty: 4 },
    { purchaseId: 'PUR002', product: 'Colgate', qty: 3, },
    { purchaseId: 'PUR003', product: 'Snickers', qty: 2 },
    { purchaseId: 'PUR005', product: 'Nescafe', qty: 2 },
    { purchaseId: 'PUR008', product: 'Dairy Milk', qty: 5 },
    { purchaseId: 'PUR009', product: 'Maggi', qty: 5 },
    { purchaseId: 'PUR011', product: 'Snickers', qty: 3 },
    { purchaseId: 'PUR016', product: 'Nescafe', qty: 4 },
    { purchaseId: 'PUR017', product: 'Dairy Milk', qty: 4 },
    { purchaseId: 'PUR019', product: 'Pepsi', qty: 5 },
    { purchaseId: 'PUR021', product: 'Colgate', qty: 4 },
    { purchaseId: 'PUR023', product: 'Maggi', qty: 2 }
]

let editIndex2 = -1
let editDetails = {}
let PrchsErrors = {}


//Show Stocks

function showStocks() {
    let show = document.getElementById('show')
    show.innerHTML = ''

    let insertTable = document.getElementById('insertTable')
    let showTheStocks = makeStocks()
    insertTable.innerHTML = showTheStocks
}



function makeStocks() {

    const mainHeading = `<h1 class="text-center">List Of Purchases</h1>`

    let createPdDropDown = CreateDropDown()


    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col"  class="hv" >Purchase id</th>
                                 <th scope="col"  class="hv" >Product</th>
                                 <th scope="col"  class="hv" >Quantity</th>
                                 <th scope="col"  class="hv" >Price</th>
                                 <th scope="col"  class="hv" >Supplier</th>
                                 <th></th>
                                 <th></th>
                             </tr>
                         </thead>
                          `

    let tableBody = purchaseForm.map((prdt, index) => {
        const { purchaseId, product, qty } = prdt

        //Find Price and Supplier
        let FindpriceAndSupp = products2.find((prod) => {
            if (prod.product === product) {
                return prod
            }
        })

        let price = FindpriceAndSupp.price
        let supplier = FindpriceAndSupp.supplier


        return `
                <tr>
                    <td>${purchaseId}</td>
                    <td>${product}</td>
                    <td>${qty}</td>
                    <td>${price}</td>
                    <td>${supplier}</td>
                    <td><button type="button" class="btn btn-secondary btn-sm" onclick="editPurchaseProduct(${index})">Edit</button></td>
                    <td><button type="button" class="btn btn-danger  btn-sm" onclick="deletePurchaseProduct(${index})">delete</button></td>
                </tr>
                `
    })



    return `${mainHeading}${createPdDropDown} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>`
}



function CreateDropDown(pHeader = '', sHeader = '') {

    //Product DropDown Body
    let pB = products2.map(prod => {
        return `<option value="${prod.product}">${prod.product}</option>`
    })

    //Product DropDown Header
    let selectedheader = (pHeader) ? pHeader : 'Select Product'
    let pH = `<option>${selectedheader}</option>`

    //Complete Product DropDown
    let cPD = `
            <select id="PDPOWN">
              ${pH}
              ${pB}
            </select>
           `


    // Supplier DropDown Body
    let sB = suppliers.map(supp => {
        return `<option value="${supp}">${supp}</option>`
    })

    let selectedheader2 = (sHeader) ? sHeader : 'Select Supplier'

    // Supplier DropDown Header
    let sH = `<option>${selectedheader2}</option>`

    //Complete Supplier DropDown
    let cSD = `
             <select id="SPDPOWN">
               ${sH}
               ${sB}
             </select>
            `

    let filterBtn = `<button type="button" onclick="filterTable()" class="btn btn-primary fbs">Filter</button>`


    return cPD + cSD + filterBtn
}

//Delete Purchase
function deletePurchaseProduct(index) {
    purchaseForm.splice(index, 1)
    showStocks()
}


//Edit Purchase Form
function editPurchaseProduct(index) {
    editDetails = purchaseForm[index]
    editIndex2 = index
    ShowPurchaseForm()
}


//Show Purchase Form
function ShowPurchaseForm() {

    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let { purchaseId = '', product = '', qty = '' } = editDetails

    let heading = (editIndex2 === -1) ? 'New Purchase Form' : 'Edit Purchase Form'

    const mainHeading = `<h1 class="text-center">${heading}</h1>`


    let prchIdInp = makeTextField('prId', 'Purchase Id', 'Enter Purchase Id', purchaseId, PrchsErrors.purchaseId)

    let dpDownForProd = prchsDpDown('PrchsProd', purchaseForm, 'Select Product being purchased', product, PrchsErrors.product)

    let addQty = makeTextField('qty', 'Quantity', 'Enter Quantity', qty, PrchsErrors.qty)

    let submitBtn = `<button type="submit" class="btn btn-primary fix-size" onclick="PrchSubmitForm()">Submit</button>`

    let show = document.getElementById('show')
    show.innerHTML = mainHeading + prchIdInp + dpDownForProd + addQty + submitBtn
}


function prchsDpDown(id, productsArr, header, editProduct = '', err = '') {

    let str = err ? `<span class="text-danger">${err}</span>` : ''


    let dpDownBody = productsArr.map(prod => {
        let product = prod.product
        let selected = (product === editProduct) ? 'selected' : ''
        return `<option ${selected}>${product}</option>`
    })

    let selected = (editProduct === '') ? 'selected' : ''
    let dpheader = `<option disabled ${selected}>${header}</option>`

    let cmpltDpDown = `
                   <div class="form-group fix-size" >
                       <select id="${id}" class="form-control">
                           ${dpheader}
                           ${dpDownBody.join('')}
                       <select>
                       ${str}
                   </div> `
    return cmpltDpDown
}


function PrchSubmitForm() {

    let purchaseId = document.getElementById('prId').value
    let product = document.getElementById('PrchsProd').value
    let quantity = document.getElementById('qty').value

    let prchItem = { purchaseId: purchaseId, product: product, qty: quantity }


    if (validatePrchs(prchItem)) {
        (editIndex2 >= 0) ? (purchaseForm[editIndex2] = prchItem) : purchaseForm.push(prchItem)
        showStocks()
    }
    else {
        editDetails = prchItem
        ShowPurchaseForm()
    }

}


function validatePrchs(item) {
    PrchsErrors.purchaseId = item.purchaseId ? '' : 'Purchase id is Mandatory'

    if (!PrchsErrors.purchaseId && editIndex2 < 0) {
        let id = item.purchaseId
        let index = purchaseForm.findIndex((prod) => {
            return prod.purchaseId === id
        })
        if (index >= 0) {
            PrchsErrors.purchaseId = 'Purchase id should be unique'
        }
    }

    let index = purchaseForm.findIndex(pr => {
        return pr.product === item.product
    })

    PrchsErrors.product = (index === -1) ? 'Select the Product' : ''

    PrchsErrors.qty = (+item.qty) ? '' : 'Quantity is mandatory'


    return !(PrchsErrors.purchaseId || PrchsErrors.product || PrchsErrors.qty)
}




function filterTable() {

    let pValue = document.getElementById('PDPOWN').value
    let sValue = document.getElementById('SPDPOWN').value

    //For Filtering value We are assigning Empty value.if user is not selecting value
    if (pValue === 'Select Product') {
        pValue = ''

    }

    if (sValue === 'Select Supplier') {
        sValue = ''
    }


    //We are making Filtered Table Body
    if (pValue && sValue) {
        console.log(pValue)
        console.log(sValue)
        var tableBody = purchaseForm.map((prdt, index) => {
            const { purchaseId, product, qty } = prdt

            //Find Price and Supplier
            let Findprice = products2.find((prod) => {
                if (prod.product === product) {
                    return prod
                }
            })

            let price, supplier


            price = Findprice.price
            supplier = Findprice.supplier



            if (product === pValue && sValue === supplier) {
                return `
                    <tr>
                        <td>${purchaseId}</td>
                        <td>${product}</td>
                        <td>${qty}</td>
                        <td>${price}</td>
                        <td>${supplier}</td>
                        <td><button type="button" class="btn btn-secondary btn-sm" onclick="editPurchaseProduct(${index})">Edit</button></td>
                        <td><button type="button" class="btn btn-danger  btn-sm" onclick="deletePurchaseProduct(${index},1)">delete</button></td>
                    </tr>
                    `
            }
        })
    } else if (pValue === '' && sValue) {
        console.log(pValue)
        console.log(sValue)
        var tableBody = purchaseForm.map((prdt, index) => {
            const { purchaseId, product, qty } = prdt

            //Find Price and Supplier
            let Findprice = products2.find((prod) => {
                if (prod.product === product) {
                    return prod
                }
            })

            let price, supplier

            price = Findprice.price
            supplier = Findprice.supplier

            if (sValue === supplier) {
                return `
                    <tr>
                        <td>${purchaseId}</td>
                        <td>${product}</td>
                        <td>${qty}</td>
                        <td>${price}</td>
                        <td>${supplier}</td>
                        <td><button type="button" class="btn btn-secondary btn-sm" onclick="editPurchaseProduct(${index})">Edit</button></td>
                        <td><button type="button" class="btn btn-danger  btn-sm" onclick="deletePurchaseProduct(${index},1)">delete</button></td>
                    </tr>
                    `
            }
        })

    } else if (sValue === '' && pValue) {
        console.log(pValue)
        console.log(sValue)
        var tableBody = purchaseForm.map((prdt, index) => {
            const { purchaseId, product, qty } = prdt

            //Find Price and Supplier
            let Findprice = products2.find((prod) => {
                if (prod.product === product) {
                    return prod
                }
            })

            let price, supplier


            price = Findprice.price
            supplier = Findprice.supplier



            if (product === pValue) {
                return `
                    <tr>
                        <td>${purchaseId}</td>
                        <td>${product}</td>
                        <td>${qty}</td>
                        <td>${price}</td>
                        <td>${supplier}</td>
                        <td><button type="button" class="btn btn-secondary btn-sm" onclick="editPurchaseProduct(${index})">Edit</button></td>
                        <td><button type="button" class="btn btn-danger  btn-sm" onclick="deletePurchaseProduct(${index},1)">delete</button></td>
                    </tr>
                    `
            }
        })
    } else {

        console.log(pValue)
        console.log(sValue)
        var tableBody = purchaseForm.map((prdt, index) => {
            const { purchaseId, product, qty } = prdt

            //Find Price and Supplier
            let Findprice = products2.find((prod) => {
                if (prod.product === product) {
                    return prod
                }
            })

            let price, supplier

            price = Findprice.price
            supplier = Findprice.supplier

            return `
                <tr>
                    <td>${purchaseId}</td>
                    <td>${product}</td>
                    <td>${qty}</td>
                    <td>${price}</td>
                    <td>${supplier}</td>
                    <td><button type="button" class="btn btn-secondary btn-sm" onclick="editPurchaseProduct(${index})">Edit</button></td>
                    <td><button type="button" class="btn btn-danger  btn-sm" onclick="deletePurchaseProduct(${index},1)">delete</button></td>
                </tr>
                `
        })

    }

    const mainHeading = `<h1 class="text-center">List Of Purchases</h1>`

    let createPdDropDown = CreateDropDown(pValue, sValue)

    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col"  class="hv" >Purchase id</th>
                                 <th scope="col"  class="hv" >Product</th>
                                 <th scope="col"  class="hv" >Quantity</th>
                                 <th scope="col"  class="hv" >Price</th>
                                 <th scope="col"  class="hv" >Supplier</th>
                                 <th></th>
                                 <th></th>
                             </tr>
                         </thead>
                          `

    const cmpltTable = `${mainHeading}${createPdDropDown} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>`

    let show = document.getElementById('show')
    show.innerHTML = ''

    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = cmpltTable
    return tableBody
}





























//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------All Sorting Functions-----------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------



function sortByProduct() {
    products.sort(sortProducts)
    showProducts()
}


function sortProducts(product1, product2) {
    let prod1 = product1.product
    let prod2 = product2.product
    return prod1.localeCompare(prod2)
}


function sortByPrice() {
    products.sort(sortPrice)
    showProducts()
}


function sortPrice(product1, product2) {
    let price1 = product1.price
    let price2 = product2.price

    if (price1 < price2) {
        return -1
    } else if (price1 > price2) {
        return 1
    } else return 0
}


function sortByDiscount() {
    products.sort(sortDiscount)
    showProducts()
}


function sortDiscount(product1, product2) {
    let discount1 = product1.discount
    let discount2 = product2.discount

    if (discount1 < discount2) {
        return -1
    } else if (discount1 > discount2) {
        return 1
    } else return 0
}


function sortBySupplier() {
    products.sort(sortSupplier)
    showProducts()
}


function sortSupplier(product1, product2) {
    let supplier1 = product1.supplier
    let supplier2 = product2.supplier
    return supplier1.localeCompare(supplier2)
}