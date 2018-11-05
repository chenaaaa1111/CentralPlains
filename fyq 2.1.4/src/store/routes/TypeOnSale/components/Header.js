/**
 * Created by mac on 17/10/11.
 */
import React, {
    Component
} from 'react';
class Header extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        loadItemDetail
    }

    render(){
        return(
                <header className="houseChange">
                    <ul>
                        <li className="houseOne changed">一房<span className="changed"></span></li><li className="houseOne">
                        三房<span></span></li>
                    </ul>
                </header>



        );
    }

}
module.exports=Header;