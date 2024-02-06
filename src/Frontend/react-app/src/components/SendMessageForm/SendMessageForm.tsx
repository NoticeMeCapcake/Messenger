// import React from 'react';
//
// export class SendMessageForm extends React.Component {
//
//     constructor(props) {
//         super(props)
//         // this.state = {
//         //     message: ''
//         // }
//         // // Привязка handleChange нужна затем, чтобы мы могли получить доступ к this внутри этого метода.
//         // this.handleChange = this.handleChange.bind(this)
//         // this.handleSubmit = this.handleSubmit.bind(this)
//     }
//
//     handleChange(e) {
//         this.setState({
//             message: e.target.value
//         })
//     }
//
//     handleSubmit(e) {
//         e.preventDefault()
//         this.props.sendMessage(this.state.message)
//         this.setState({
//             message: ''
//         })
//     }
//
//     render() {
//         return (
//             <form
//                 className="send-message-form"
//                 onSubmit={this.handleSubmit}>
//                 <input
//                     onChange={this.handleChange}
//                     value={this.state.message}
//                     placeholder="Type your message and hit ENTER"
//                     type="text" />
//             </form>
//         )
//     }
// }