import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
import { Pageview } from '@mui/icons-material'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    LOAD_ALL_LISTS: "LOAD_ALL_LISTS",
    CHANGE_PAGE_VIEW: "CHANGE_PAGE_VIEW",
    CHANGE_FILTER: "CHANGE_FILTER",
    CHANGE_SORTING: "CHANGE_SORTING",
    CHANGE_FILTER_USERNAME: "CHANGE_FILTER_USERNAME",
}

export const PageViewTypes = {
    HOME: "HOME",
    ALL: "ALL",
    USER: "USER",
    COMM: "COMM",
}

export const SortingTypes = {
    NONE: "NONE",
    DATEA: "DATEA",
    DATED: "DATED",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        allLists: [],
        pageView: PageViewTypes.HOME,
        // pageView: null,
        filter: "",
        sort: SortingTypes.NONE,
        filterUsername: "",
    });
    const history = useHistory();



    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            // case GlobalStoreActionType.CHANGE_LIST_NAME: {
            //     return setStore({
            //         idNamePairs: payload.idNamePairs,
            //         currentList: payload.top5List,
            //         newListCounter: store.newListCounter,
            //         isListNameEditActive: false,
            //         isItemEditActive: false,
            //         listMarkedForDeletion: null,
            //         allLists: store.allLists,
            //         pageView: store.pageView,
            //         filter: store.filter,
            //         sort: store.sort,
            //     });
            // }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore ((prevState) => ({
                    ...prevState, currentList: null, listMarkedForDeletion: null, filterUsername: "",
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: null,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: false,
                //     isItemEditActive: false,
                //     listMarkedForDeletion: null,
                //     allLists: store.allLists,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,
                // })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore ((prevState) => ({
                    ...prevState, currentList: payload, newListCounter: prevState.newListCounter + 1, listMarkedForDeletion: null,
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: payload,
                //     newListCounter: store.newListCounter + 1,
                //     isListNameEditActive: false,
                //     isItemEditActive: false,
                //     listMarkedForDeletion: null,
                //     allLists: store.allLists,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,
                // })
            }
            
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore ((prevState) => ({
                    ...prevState, listMarkedForDeletion: payload,
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: null,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: false,
                //     isItemEditActive: false,
                //     listMarkedForDeletion: payload,
                //     allLists: store.allLists,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,
                // });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore ((prevState) => ({
                    ...prevState, listMarkedForDeletion: null,
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: null,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: false,
                //     isItemEditActive: false,
                //     listMarkedForDeletion: null,
                //     allLists: store.allLists,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,
                // });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore ((prevState) => ({
                    ...prevState, currentList: payload, listMarkedForDeletion: null,
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: payload,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: false,
                //     isItemEditActive: false,
                //     listMarkedForDeletion: null,
                //     allLists: store.allLists,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,
                // });
            }
            // // START EDITING A LIST ITEM
            // case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
            //     return setStore({
            //         idNamePairs: store.idNamePairs,
            //         currentList: store.currentList,
            //         newListCounter: store.newListCounter,
            //         isListNameEditActive: false,
            //         isItemEditActive: true,
            //         listMarkedForDeletion: null,
            //         allLists: store.allLists,
            //         pageView: store.pageView,
            //         filter: store.filter,
            //     });
            // }
            // // START EDITING A LIST NAME
            // case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
            //     return setStore({
            //         idNamePairs: store.idNamePairs,
            //         currentList: payload,
            //         newListCounter: store.newListCounter,
            //         isListNameEditActive: true,
            //         isItemEditActive: false,
            //         listMarkedForDeletion: null,
            //         allLists: store.allLists,
            //         pageView: store.pageView,
            //         filter: store.filter,
            //     });
            // }

            case GlobalStoreActionType.LOAD_ALL_LISTS:{
                return setStore ((prevState) => ({
                    ...prevState, allLists: payload, listMarkedForDeletion: null, 
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: store.currentList,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: store.isListNameEditActive,
                //     isItemEditActive: store.isItemEditActive,
                //     listMarkedForDeletion: null,
                //     allLists: payload,
                //     pageView: store.pageView,
                //     filter: store.filter,
                //     sort: store.sort,

                // });
            }

            case GlobalStoreActionType.CHANGE_PAGE_VIEW:{
                return setStore ((prevState) => ({
                    ...prevState, pageView: payload, listMarkedForDeletion: null,
                }))
                // return setStore({
                //     idNamePairs: store.idNamePairs,
                //     currentList: store.currentList,
                //     newListCounter: store.newListCounter,
                //     isListNameEditActive: store.isListNameEditActive,
                //     isItemEditActive: store.isItemEditActive,
                //     listMarkedForDeletion: null,
                //     allLists: store.allLists,
                //     pageView: payload,
                //     filter: store.filter,
                //     sort: SortingTypes.NONE,

                // });
            }

            case GlobalStoreActionType.CHANGE_FILTER:{
                    return setStore ((prevState) => ({
                        ...prevState, filter: payload, listMarkedForDeletion: null,
                    // idNamePairs: store.idNamePairs,
                    // currentList: store.currentList,
                    // newListCounter: store.newListCounter,
                    // isListNameEditActive: store.isListNameEditActive,
                    // isItemEditActive: store.isItemEditActive,
                    // listMarkedForDeletion: null,
                    // allLists: store.allLists,
                    // pageView: store.pageView,
                    // filter: payload,
                    // sort: store.sort,
                }))
            }
            
            case GlobalStoreActionType.CHANGE_SORTING:{
                return setStore ((prevState) => ({
                    ...prevState, sort: payload, listMarkedForDeletion: null
                    // idNamePairs: store.idNamePairs,
                    // currentList: store.currentList,
                    // newListCounter: store.newListCounter,
                    // isListNameEditActive: store.isListNameEditActive,
                    // isItemEditActive: store.isItemEditActive,
                    // listMarkedForDeletion: null,
                    // allLists: store.allLists,
                    // pageView: store.pageView,
                    // filter: store.filter,
                    // sort: payload,
                }))
            }

            case GlobalStoreActionType.CHANGE_FILTER_USERNAME:{
                return setStore ((prevState) => ({
                    ...prevState, filterUsername: payload, listMarkedForDeletion: null
                }))
            }
            default:
                return store;
        }
    }

    store.changeFilterUsername = function(str){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_FILTER_USERNAME,
            payload: str
        })
    }
    store.changeView = function(pvType){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE_VIEW,
            payload: pvType
        })
        // console.log(store.pageView)
        //store.loadAllLists()
       
    }

    store.changeFilter = function(string){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_FILTER,
            payload: string,
        })
        
    }
    console.log("FROM THE STORE: " + store.filter)
    store.changeSorting = function(sortStr){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_SORTING,
            payload: sortStr    
        })
        // console.log("Sorting by: " + sortStr)
        //userString will need to change eventually 
        console.log("Sort Str: " +sortStr)
        store.loadAllLists();
    }
    store.loadAllLists = async function(){
        let payload = null
        // console.log("Load Lists")
        // console.log(auth.user)
        console.log("HEY HERE SORTING: " + store.sort)
        switch (store.pageView) {
            case PageViewTypes.HOME: 
                payload = {
                    params:{
                        username: auth.user.username,
                        sort: store.sort,
                        filter: store.filter,
                    }
                }
                break;
            case PageViewTypes.ALL:
                //ALl lists and any list names matching the text
                payload = {
                    params:{
                        username: "",
                        sort: store.sort
                    }
                }
                break
            case PageViewTypes.USER:
                //User has to match the searchText
                return
                break
            case PageViewTypes.COMM:
                //An entirely different method has to be called her. Get Community lists. 
                return
                break

            default:
                payload = {
                    params:{
                        username: "",
                    }
                }
        }
        console.log(payload)
        const response = await api.getAllTop5Lists(payload);
        if (response.data.success) {
            //console.log("AFMIOAMFOPISAMFIOPMASPIOMFIPASMFPIOMASPOFAPOSFMPOMSAFMP")
            // console.log(response.data.data)
            let lists = response.data.data

            //console.log(lists)
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_LISTS,
                payload: lists
            });
        }
        else {
            console.log("API FAILED TO GET ALL LISTS");
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        console.log("LISTNAME CHANGED")
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            await updateList(top5List);
            history.push("/top5list/" + id);
            
        }
    }
    
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    store.closeLogout = function(){
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
    }
    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerUsername: auth.user.username,
            views: 0,
            likers: [],
            dislikers: [],
            comments:[],
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    // store.loadIdNamePairs = async function () {
    //     console.log("Loading by IDNAME")
    //     console.log(auth.user.email)
    //     const response = await api.getTop5ListPairs(auth.user.email);
    //     if (response.data.success) {
    //         let pairsArray = response.data.idNamePairs;
    //         storeReducer({
    //             type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
    //             payload: pairsArray
    //         });
    //     }
    //     else {
    //         console.log("API FAILED TO GET THE LIST PAIRS");
    //     }
    // }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        console.log("MARKING LIST FOR DELETION")
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            //store.loadIdNamePairs();
            store.loadAllLists()
            // history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        console.log(store.listMarkedForDeletion)
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
        console.log(store.listMarkedForDeletion)
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        // console.log("SETTING CURRENT LIST")
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    // store.getItemsById = async function(id){
    //     let response = await api.getTop5ListById(id);
    //     if (response.data.success) {
    //         let items = response.data.top5List.items;
    //         //console.log(items)
    //         return items;
    //     }
    //     return null;
    // }

    // store.addMoveItemTransaction = function (start, end) {
    //     let transaction = new MoveItem_Transaction(store, start, end);
    //     tps.addTransaction(transaction);
    // }

    // store.addUpdateItemTransaction = function (index, newText) {
    //     let oldText = store.currentList.items[index];
    //     let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
    //     tps.addTransaction(transaction);
    // }

    // store.moveItem = function (start, end) {
    //     start -= 1;
    //     end -= 1;
    //     if (start < end) {
    //         let temp = store.currentList.items[start];
    //         for (let i = start; i < end; i++) {
    //             store.currentList.items[i] = store.currentList.items[i + 1];
    //         }
    //         store.currentList.items[end] = temp;
    //     }
    //     else if (start > end) {
    //         let temp = store.currentList.items[start];
    //         for (let i = start; i > end; i--) {
    //             store.currentList.items[i] = store.currentList.items[i - 1];
    //         }
    //         store.currentList.items[end] = temp;
    //     }

    //     // NOW MAKE IT OFFICIAL
    //     store.updateCurrentList();
    // }

    // store.updateItem = function (index, newItem) {
    //     store.currentList.items[index] = newItem;
    //     store.updateCurrentList();
    // }
    
    

    store.updateCurrentList = async function (top5List) {
        // const response = await api.updateTop5ListById(store.currentList._id, top5List);
        const response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.data.success) {
            // storeReducer({
            //     type: GlobalStoreActionType.SET_CURRENT_LIST,
            //     payload: store.currentList
            // });
            if (store.currentList){
                store.closeCurrentList();
            }
           
        }
    }

    // store.undo = function () {
    //     tps.undoTransaction();
    // }

    // store.redo = function () {
    //     tps.doTransaction();
    // }

    // store.canUndo = function() {
    //     return tps.hasTransactionToUndo();
    // }

    // store.canRedo = function() {
    //     return tps.hasTransactionToRedo();
    // }

    // // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    // store.setIsListNameEditActive = function () {
    //     storeReducer({
    //         type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
    //         payload: null
    //     });
    // }

    // // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    // store.setIsItemEditActive = function () {
    //     storeReducer({
    //         type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
    //         payload: null
    //     });
    // }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };