/*jshint esnext: true */

class Scoreboard extends React.Component {
  handleClick(event) {
    event.preventDefault();

    $('#scoreboard').hide();
  }

  render() {
    if (this.props.timer == 0) {
      $('#scoreboard').addClass('animated fadeInDownBig');
      $('.overlay').addClass('active');
    }

    return (
      <div>
      <div className="overlay">
        <section id='scoreboard'>
          <h1>Battle terminé !</h1>
        </section>
      </div>
      </div>
    );
  }
}
