import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import PlanWeekView from "./PlanWeekView";
import CreateMealModal from "../CreateMealModal/CreateMealModal";

class PlanWeekController extends React.Component {
  handleSidebar = key => {
    this.setState({ weekExists: false });
    this.props.data.getMeals.map((el, index) => {
      if (el.week === key) {
        this.setState({ week: index, weekExists: true });
      }
    });
  };

  handleAddMeal(day) {
    console.log(day);
  }

  createModal() {
    return <CreateMealModal />;
  }

  getWeek = d => {
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const jan4 = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target - jan4) / 86400000;
    const weekNr = 1 + Math.ceil(dayDiff / 7);
    return weekNr;
  };

  state = {
    week: 0,
    weekExists: true
  };

  render() {
    return (
      <div>
        {this.props.data.loading ? (
          <p>loading</p>
        ) : this.state.weekExists ? (
          <PlanWeekView
            sidebar={this.handleSidebar}
            meals={this.props.data.getMeals[this.state.week]}
            addMeal={this.handleAddMeal}
            week={this.getWeek}
          />
        ) : (
          <PlanWeekView
            sidebar={this.handleSidebar}
            addMeal={this.handleAddMeal}
            meals={{
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: []
            }}
            week={this.getWeek}
          />
        )}
        {this.createModal()}
      </div>
    );
  }
}

const getMealsQuery = gql`
  query getMeals($id: ID) {
    getMeals(id: $id) {
      week
      Monday
      Tuesday
      Wednesday
      Thursday
      Friday
      Saturday
      Sunday
    }
  }
`;

export default graphql(getMealsQuery, {
  options: props => ({
    variables: { id: props.userId }
  })
})(PlanWeekController);
