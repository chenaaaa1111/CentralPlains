import {
	LISTITEM_ACTION_PUTAWAY,
	LISTITEM_ACTION_SETHOT,
	LISTITEM_ACTION_EDIT,
	LISTITEM_ACTION_REMOVE,
	LISTITEM_ACTION_DELETE,
	LISTITEM_ACTION_SELL,
	LISTITEM_ACTION_RENT,
	PUTAWAY_VALUE,
	ONPUTAWAY_VALUE,
	PUSH_VALUE,
	LISTITEM_ACTION_CANCELHOT
} from './Const';

class ListItemObj {
	constructor(info) {
		info = info || this.getTestInfo();
		this.houseid = info.PostId;
		this.adid = info.AdvertKeyid || info.KeyId;
		this.adno = info.AdNo;
		this.estname = info.DisplayEstName || info.EstateName;
		this.size = info.NArea || info.Square;
		this.tradetype = info.TradeType;
		this.trusttype = info.TrustType;
		this.houseNo = info.HouseNo;
		this.housetype = this.transformHouseType(info.HouseType) || this.getHouseTypeString(info.RoomCnt, info.HallCnt, info.ToiletCnt, info.BalconyCnt);
		this.title = info.Title;
		this.desription = info.Description;
		this.propertyright = info.PropertyRight;
		this.fitment = info.Fitment;
		this.direction = info.Direction;
		this.date = info.OpDate;
		this.price = info.SellPrice || info.RentalPrice || info.PrivatePrice || 0;
		this.sellprice = info.SellPrice;
		this.rentprice = info.RentalPrice;
		this.privateprice = info.PrivatePrice;
		this.updatetime = info.WithoutUpdateDays;
		this.defaultImg = info.DefaultImage;
		this.status = info.PostStatus;
		this.isOnline = info.IsOnline;
		this.isFollow = !info.IsNewProperty;
		this.isNew = info.IsNewProperty;
		this.isHot = info.IsHotProperty;
		this.valid = info.PropertyStatus;
		this.statusName = info.PropertyStatusName;
		this.centaline = info.AdCount;
		this.entrustStatus = info.PropEntrustStatus;
		this.port = info.CloneCount;
		let buildingName = info.BuildingName || '';
		let houseNo = info.HouseNo || '';
		this.address = buildingName + houseNo;
		if (parseInt(this.status) != 0 && parseInt(this.status) != 1) {
			this.showImage = false;
			this.showUpdateTime = false;
		} else {
			this.showImage = true;
			this.showUpdateTime = true;
		}
		this.showMenu = false;
		this.checked = false;
		this.isCheckable = false;
		this.enableAction();
	}
	transformHouseType(housetype) {
		if (!housetype) {
			return '';
		}
		let houseTypeDatas = housetype.split('-');
		let retHouseType = this.getHouseTypeString(houseTypeDatas[0], houseTypeDatas[1], houseTypeDatas[2], houseTypeDatas[3]);
		return retHouseType;
	}
	getHouseTypeString(room, hall, kitchen, toilet) {
		return room + '室' + hall + '厅' + kitchen + '卫' + toilet + '阳台';
	}
	restTimeToDays(time) {
		let rest = new Date().getTime() - time;
		let day = Math.floor(rest / (1000 * 60 * 60 * 24));
		return day;
	}
	updateItem(action) {
		switch (action) {
			case LISTITEM_ACTION_PUTAWAY:
				break;
			case LISTITEM_ACTION_SETHOT:
				break;
			case LISTITEM_ACTION_DELETE:
				break;
			case LISTITEM_ACTION_REMOVE:
				break;
		}
	}
	getMenuItems(status) {
		return [{
			label: '上架',
			value: LISTITEM_ACTION_PUTAWAY,
			enabled: false,
			visible: false
		}, {
			label: '设置笋盘',
			value: LISTITEM_ACTION_SETHOT,
			enabled: false,
			visible: false
		}, {
			label: '取消笋盘',
			value: LISTITEM_ACTION_CANCELHOT,
			enabled: false,
			visible: false
		}, {
			label: '编辑',
			value: LISTITEM_ACTION_EDIT,
			enabled: false,
			visible: false
		}, {
			label: '发布出售',
			value: LISTITEM_ACTION_SELL,
			enabled: false,
			visible: false
		}, {
			label: '发布出租',
			value: LISTITEM_ACTION_RENT,
			enabled: false,
			visible: false
		}, {
			label: '删除',
			value: LISTITEM_ACTION_DELETE,
			enabled: false,
			visible: false
		}, {
			label: '下架',
			value: LISTITEM_ACTION_REMOVE,
			enabled: false,
			visible: false
		}];
	}

	enableAction() {
		let menuitems = this.getMenuItems(this.status);
		menuitems.forEach((item, index) => {
			switch (item.value) {
				case LISTITEM_ACTION_PUTAWAY:
					if (this.status === ONPUTAWAY_VALUE) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
				case LISTITEM_ACTION_SETHOT:
					if (this.status === PUTAWAY_VALUE && !this.isHot) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
				case LISTITEM_ACTION_CANCELHOT:
					if (this.status === PUTAWAY_VALUE && this.isHot) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
				case LISTITEM_ACTION_EDIT:
					if (this.status === PUTAWAY_VALUE || this.status === ONPUTAWAY_VALUE) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
				case LISTITEM_ACTION_SELL:
					if (this.status != PUTAWAY_VALUE && this.status != ONPUTAWAY_VALUE && this.tradetype === 1) {
						item.visible = true;
					}
					break;
				case LISTITEM_ACTION_RENT:
					if (this.status != PUTAWAY_VALUE && this.status != ONPUTAWAY_VALUE && this.tradetype === 2) {
						item.visible = true;
					}
					break;
				case LISTITEM_ACTION_DELETE:
					if (this.status === ONPUTAWAY_VALUE) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
				case LISTITEM_ACTION_REMOVE:
					if (this.status === PUTAWAY_VALUE) {
						item.visible = true;
						item.enabled = true;
					} else {
						item.visible = false;
						item.enabled = false;
					}
					break;
			}
		});
		this.menuitems = menuitems;
	}
}
export default ListItemObj;