import React from 'react';
import axios from 'axios';
import TeamMember from '../TeamMember';
import './App.css';
import PopupForm from '../PopupForm/PopupForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true,
      showForm: false,
      isEdit: {status: false},
    };

    this.toggle = this.toggle.bind(this);
    this.createMember = this.createMember.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editMember = this.editMember.bind(this);
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get('/team');
    this.setState({
      team: response.data,
      loading: false
    });
  }

  async createMember(member) {
    let result = (await axios.post('/team', member)).data
    if(result.status){
      this.setState({
        team: [...this.state.team, {...member,id: result.id}]  
      })
      console.log("Created new member");
      this.toggle();
      return true;
    } else return false;
  }

  async deleteMember(id) {
    if((await axios.post('/team/delete', {id})).data.status){
      this.setState({
        team: this.state.team.filter(t => t.id != id)
      })
      console.log("Deleted member");
      return true;
    } else return false;
  }

  async editMember(member) {
    if(this.state.isEdit.id) {
      if((await axios.post('/team/update', {...member, id: this.state.isEdit.id})).data.status) {
        let cop = this.state.team
        for (let i = 0; i < cop.length;i++) 
          if(cop[i].id == this.state.isEdit.id)
            cop[i] = {...member, id: this.state.isEdit.id}
        this.setState({team: cop}); 
        this.toggleEdit();
        this.toggle();
        return true;
      } else return false;
    }
  }

  toggle() {
    this.setState({showForm: !this.state.showForm})
    if(this.state.isEdit.status) this.toggleEdit();
  }
  
  toggleEdit(id) {
    this.setState({isEdit: {...this.state.isEdit, status: !this.state.isEdit.status, id}});
  }

  onEdit(id) {
    this.toggleEdit(id);
    this.toggle();
  }

  getMember(id) {
    for(let i = 0; i < this.state.team.length;i++) 
      if(this.state.team[i].id == id) return this.state.team[i]
    
    return null;
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="app">
        <div className={`team-grid ${this.state.showForm ? "blur":""}`} >
          {this.state.team.map(member => (
            <TeamMember
              key={member.id}
              id={member.id}
              name={`${member.firstName} ${member.lastName}`}
              title={member.title}
              photoUrl={member.photoUrl}
              story={member.story}
              favoriteColor={member.favoriteColor}
              onDelete={() => this.deleteMember(member.id)} 
              onEdit={() => {this.onEdit(member.id)}}
            />
          ))}
          {/* Make this new team member link to your form! */}
          <TeamMember id="new" name="Join us!" title="New Teammate" onClick={this.toggle} placeHolder={true} />
        </div>

        {this.state.showForm && 
          <PopupForm 
            createMember={this.state.isEdit.status ? this.editMember: this.createMember} 
            close={this.toggle} 
            title={this.state.isEdit.status ? "Edit Teammate": "Create Teammate"}
            member={this.state.isEdit.status ? this.getMember(this.state.isEdit.id):{}}/>}
            
      </div>
    );
  }
}

export default App;
