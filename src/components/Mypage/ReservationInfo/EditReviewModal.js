import axios from "axios"; 
import "./editReviewModal.css"
import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
class EditReviewlModal extends Component  {
  constructor(props) {
    super(props);
    
    this.state = {
      newtitle: null,
      description: null,
      message: null,
      errorMessage: null,
      rate: 0
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.editReview = this.editReview.bind(this)
  };
  handleInputValue = (key) => (e) => {
    this.setState({ [key] : e.target.value })
  }
  editReview() {
    const { title } = this.props.originReview;

    const { accessToken, reservationid } = this.props;
    const { newtitle, description, rate } = this.state;

    let body = 
    { title: newtitle,
      description: description,
      reservationId: reservationid,
      star: rate }

    if(!description) {
      this.setState({errorMessage: '수정 사항이 없습니다.'})
    }
    if(!newtitle) {
      body.title = title
    }
    axios.post(`${process.env.REACT_APP_URL}/mypage/writereview`, body,
    { headers: {"Authorization": `Bearer ${accessToken}`}})
    .then(res => {
      if(res.status === 201) {
        this.setState({message: '수정되었습니다.'})}
    })
  }
  componentDidMount() {
  const newthis = this
  //별점선택 이벤트 리스너
  const rateForms = document.querySelectorAll('.rating'); /* 별점 선택 템플릿을 모두 선택 */
  rateForms.forEach(function(item){//클릭 이벤트 리스너 각각 등록
  item.addEventListener('click',function(e){
    let elem = e.target;
    if(elem.classList.contains('rate_radio')){
      rating.setRate(elem.parentElement, parseInt(elem.value)); // setRate() 에 ".rating" 요소를 첫 번째 파라메터로 넘김
    }
  })
  });
  //별점 마킹 모듈 프로토타입으로 생성
  class Rating {
    constructor() { }
    setRate(rateobj, newrate) {
      //별점 마킹 - 클릭한 별 이하 모든 별 체크 처리
      this.rate = newrate;
      let checks = null;
      //요소가 파라메터로 넘어오면 별점 클릭, 없으면 저장 후 전체 초기화
      if (rateobj) {
          newthis.setState({rate: newrate})
          rateobj.querySelector('.ratefill').style.width = parseInt(newrate * 30) + 'px'; // 현재 별점 갯수 채색
          checks = rateobj.querySelectorAll('.rate_radio'); // 넘어온 요소 하위의 라디오버튼만 선택
      } else {
          //전체 별점 채색 초기화
          const rateFills = document.querySelectorAll('.ratefill');
          rateFills.forEach(function (item) {
              item.style.width = parseInt(newrate * 60) + 'px';
          });
          //전체 라디오 버튼 초기화
          checks = document.querySelectorAll('.rate_radio');
      }
      //별점 체크 라디오 버튼 처리
      if (checks) {
          checks.forEach(function (item, idx) {
              if (idx < newrate) {
                  item.checked = true;
              } else {
                  item.checked = false;
              }
          });
      }
    }
    showMessage(type) {
      switch (type) {
          case 'rate':
              //안내메시지 표시
              document.querySelector('.review_rating .warning_msg').style.display = 'block';
              //지정된 시간 후 안내 메시지 감춤
              setTimeout(function () {
                  document.querySelector('.review_rating .warning_msg').style.display = 'none';
              }, 1000);
              break;
          case 'review':
              //안내메시지 표시
              document.querySelector('.review_contents .warning_msg').style.display = 'block';
              //지정된 시간 후 안내 메시지 감춤
              setTimeout(function () {
                  document.querySelector('.review_contents .warning_msg').style.display = 'none';
              }, 1000);
              break;
      }
    }
  };
  Rating.prototype.rate = 0;
  let rating = new Rating();//별점 인스턴스 생성
  }
  render() {
  const { close } = this.props;
  const { message, errorMessage } = this.state;
  const { title, description } = this.props.originReview;
  return (
    <div className="ERMmodalBG">
      <div className="ERMctn">
        {message ? 
          <>
          <div>{message}</div>
          <button className="btnERM" onClick={close}>확인</button>
          </> :
          <div className="ERMctnMid">
            {errorMessage && <div className="ERMerrorMsg">{errorMessage}</div>}
             <input
            defaultValue={title}
            placeholder={title}
            className="ERMtitle"
            type="text"
            style={{
              width:400,
              height:40
            }}
            onChange={this.handleInputValue("newtitle")} />
          <textarea
            defaultValue={description}
            placeholder={description}
            className="ERMcontent"
            type="textarea"
            style={{
              width:400,
              height:200
            }}
            onChange={this.handleInputValue("description")} />
          <div className="wrap">
          <form name="reviewform" className="reviewform" method="post" action="/save">
            <input type="hidden" name="rate" id="rate" value="0"/>
            <div className="review_rating rating_point">
              <div className="rating">
                <div className="ratefill"></div>
                <input type="checkbox" name="rating" id="rating11" value="1" className="rate_radio" title="1점"/>
                <label htmlFor="rating11"></label>
                <input type="checkbox" name="rating" id="rating12" value="2" className="rate_radio" title="2점"/>
                <label htmlFor="rating12"></label>
                <input type="checkbox" name="rating" id="rating13" value="3" className="rate_radio" title="3점" />
                <label htmlFor="rating13"></label>
                <input type="checkbox" name="rating" id="rating14" value="4" className="rate_radio" title="4점"/>
                <label htmlFor="rating14"></label>
                <input type="checkbox" name="rating" id="rating15" value="5" className="rate_radio" title="5점"/>                  <label htmlFor="rating15"></label>
              </div>
            </div>
          </form>
          </div>
          <div className="btnERMctn">
          <button className="btnERM" onClick={this.editReview}>수정하기</button>
          <button className="btnERM" onClick={close}>닫기</button>
          </div>
          </div>
        }
      </div>
    </div>
    )
  }
}
export default withRouter(EditReviewlModal)