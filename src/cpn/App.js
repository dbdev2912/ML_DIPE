import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignIn from './routes/SignIn';
import "../css/index.scss";

import AdminHome from './routes/admin/home';
import AdminDB from './routes/admin/db';
import AdminAccounts from './routes/admin/accounts';
import AdminPrivileges from './routes/admin/privileges';
import AdminDesginPages from './routes/admin/design/pages';
import AdminDesginPageAdd from './routes/admin/design/pageadd';
import AdminDesginPageEdit from './routes/admin/design/pageedit';

export default () => {

    const dispatch      = useDispatch();
    const unique_string = useSelector( state => state.unique_string );
    const isSigned      = useSelector( state => state.is_signed );
    const credential    = useSelector( state => state.credential );
    useEffect(() => {
        fetch('/api/get/the/god/damn/api/key/with/ridiculous/long/url/string')
        .then( res => res.json() )
        .then( ({ unique_string }) => {
            dispatch({
                type: "setUniqueString",
                payload: { unique_string }
            })

            fetch(`/api/${ unique_string }/auth/session`)
            .then( res => res.json() ).then( ({ session }) => {
                dispatch({
                    type: "setSession",
                    payload: { session }
                })
            })

        })
    }, [])

    return (
        <div className="app">
            { !isSigned ?
                <SignIn />
                :
                <React.StrictMode>
                    { credential.account_role === "admin" ?

                    <Router>
                         <Routes>
                             <Route exac path = '/ml-admin' element={
                                 <React.StrictMode>
                                   <AdminHome />
                                </React.StrictMode>
                                }/>

                            <Route exac path = '/ml-admin/db' element={
                                    <React.StrictMode>
                                      <AdminDB />
                                   </React.StrictMode>
                               }/>

                            <Route exac path = '/ml-admin/accounts' element={
                                   <React.StrictMode>
                                     <AdminAccounts />
                                  </React.StrictMode>
                              }/>
                            <Route exac path = '/ml-admin/privileges' element={
                                     <React.StrictMode>
                                       <AdminPrivileges />
                                    </React.StrictMode>
                                }/>
                            <Route exac path = "/ml-admin/design/pages" element= {
                               <React.StrictMode>
                                     <AdminDesginPages />
                                  </React.StrictMode>
                              }/>
                            <Route exac path = "/ml-admin/design/page/add" element= {
                                 <React.StrictMode>
                                   <AdminDesginPageAdd />
                                </React.StrictMode>
                            }/>
                            <Route exac path = "/ml-admin/design/page/edit/:page_id" element={
                                <React.StrictMode>
                                    <AdminDesginPageEdit />
                                </React.StrictMode>
                              }/>
                        </Routes>
                     </Router>


                    :
                    <Router>
                         <Routes>
                             <Route exac path = '/' element={
                                 <React.StrictMode>
                                   <div>
                                       <h1>User Home</h1>
                                    </div>
                                    </React.StrictMode>
                                }/>
                            </Routes>

                     </Router>
                    }
                </React.StrictMode>
            }
        </div>
    )
}
