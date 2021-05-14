/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import net from 'net';
//引入路由组件
import {Router} from '@vaadin/router';
import {UserList} from './component/UserList';
import {HomeView} from "./component/HomeView";
import {About} from "./component/About";


// Tell the browser to associate the '<home-view>' tag with HomeView class
customElements.define('x-home-view', HomeView);
customElements.define('x-user-list', UserList);
customElements.define('x-about', About);


const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
    {path: '/', component: 'x-home-view'},
    {path: '/users', component: 'x-user-list'},
    {path: '/about', component: 'x-about'}
  //  {path: '/users/:user', component: 'x-user-profile'},
]);

console.log('👋 This message is being logged by "renderer.js", included via webpack');


console.time('socket_namedpipe');
const socket_namedpipe = net.createConnection('\\\\.\\pipe\\' + "bsmi_mail_kernel",
    function() {
    console.log("Socket connected (named pipe)");
    console.timeEnd('socket_namedpipe');
});
socket_namedpipe.on('error', function(e){
    console.error(e);
    console.timeEnd('socket_namedpipe');
});


const rpcRequest = {
    "method": "rpc_modules",
//    "params": ["hello", 3, ["a", "b", "c"]],
    //"params": [],
    "jsonrpc":"2.0",
    "id": 1
};

const make_rpc_call = () => {

    socket_namedpipe.write(JSON.stringify(rpcRequest));
    socket_namedpipe.write(JSON.stringify({
        "method": "test_echo",
        "params": ["hello", 1, {s: "china"}],
        "jsonrpc": "2.0",
        "id": 2
    }));
}

socket_namedpipe.on("data", (chunk) => {
    const rawResponse = chunk.toString('utf8');
    console.log(rawResponse);

    if (rawResponse.indexOf("{\"jsonrpc\":\"2.0\"")>-1){
        console.log("counst:" + rawResponse.indexOf("{\"jsonrpc\":\"2.0\""));
        console.log("有多条返回响应");
        rawResponse.split("\n").forEach((x) => {
            console.log("x" + x);
        });

    }
    try {

        const rpcResponse = JSON.parse(rawResponse);
        console.log(rpcResponse);

        document.getElementById("div-log").innerHTML = JSON.stringify(rpcResponse.result) + document.getElementById("div-log").innerHTML;
    } catch (e) {
        console.log(e);
    }
})

document.getElementById("rpc-test").addEventListener("click", () => {
    make_rpc_call();
})



