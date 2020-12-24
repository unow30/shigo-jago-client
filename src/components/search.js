import React, { Component } from 'react';
import { withRouter, Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import ResultList from './ResultList/ResultList';

class Search extends Component {
    render() {
        return (
            <Router>
            <div class="section">
            <div class="search__box">
                <div class="search__title">
                    특색 있는 숙소와 즐길<br /> 거리를 예약하세요.
                </div>
                <table>
                    <tr>
                        <td colspan="2" class="search__sub__title">목적지</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input class="search__input" type="text" placeholder="  모든 위치" />
                        </td>
                    </tr>
                    <tr>
                        <td class="search__sub__title">체크인</td>
                        <td class="search__sub__title">체크아웃</td>
                    </tr>
                    <tr>
                        <td><input class="search__input" type="date" /></td>
                        <td><input class="search__input" type="date" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="search__sub__title">인원</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <select class="search__input">
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <div class="search__button">
                    <Link to='/resultList'>검색</Link>
                </div>
            </div>
            <Switch>
              <Route exact path="/resultList" >
                <ResultList/>
              </Route>
            </Switch>
            </div>
            </Router>
        )
    }
}

export default withRouter(Search)