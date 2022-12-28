const socket = io()
var userName;
var chat = document.querySelector('.chat')
var user_list = document.querySelector('.user-list')
var user_count = document.querySelector('.user-count')
var msg_send = document.querySelector('#user-send')
var user_msg = document.querySelector('#user-msg')
do {
    userName = prompt('Enter your name:');
} while (!userName);
//it will be called useer is joined
socket.emit('new-user-joined', userName);
//notify that user is joined
socket.on('user-connected', (socket_name) => {
    userJoinLeft(socket_name, 'joined')

})
//fun to crt joined/left status dv//
function userJoinLeft(name, status) {
    let div = document.createElement('div');
    div.classList.add('user-join');
    let content = `<p><b>${name}</b> ${status} the chat</p>`;
    div.innerHTML = content;
    chat.appendChild(div);
}
//notify that user has left
socket.on('user-disconnected', (user) => {
    userJoinLeft(user, 'left')
})
//for updateing usrs list and usercounts
socket.on('user-list', (user) => {
    user_list.innerHTML = '';
    user_arr = Object.values(user)
    for (let i = 0; i < user_arr.length; i++) {
        let p = document.createElement('p')
        p.innerHTML = user_arr[i];
        user_list.appendChild(p)
    }
    user_count.innerHTML = user_arr.length
})
//for  sending message

msg_send.addEventListener('click', () => {
    let data = {
        user: userName,
        msg: user_msg.value
    };
    if (user_msg.value != '') {
        appendMessage(data, 'outgoing');
        socket.emit('message', data)
        user_msg.value = ''
    }
})
function appendMessage(data, status) {
    let div = document.createElement('div');
    div.classList.add('message', status);
    let content = `<h5>${data.user}</h5>
    <p>${data.msg}</p>`;
    div.innerHTML = content;
    chat.appendChild(div);
}
socket.on('message', (data) => {
    appendMessage(data, 'incoming');
})