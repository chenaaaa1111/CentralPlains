import {
	MAX_ROOMIMG_COUNT,
	MAX_STYLEIMG_COUNT,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_STYLE,
	DETAIL_STATUS_INIT
} from './Const';
import Config from './Config';
class AdDetail {
	constructor() {}
	setInfo(info) {
		this.houseid = info.PropertyKeyId;
		this.adno = info.AdsNo;
		this.adid = info.AdvertKeyid;
		this.estname = info.DisplayEstName || '';
		this.buildName = info.BuildingName || '';
		this.houseNo = info.HouseNo || '';
		this.size = info.NArea || '';
		this.propertytype = info.PropertyType !== '-' ? info.PropertyType : '';
		this.tradetype = info.TradeType || '';
		this.housetype = [info.RoomCnt, info.HallCnt, info.ToiletCnt, info.BalconyCnt].join("-");
		this.title = info.Title || '';
		this.floor = info.Floor !== '-' ? info.Floor : '';
		this.date = info.OpDate || '';
		this.description = info.Description || '';
		this.propertyright = info.PropertyRight !== '-' ? info.PropertyRight : '';
		this.fitment = info.Fitment || '';
		this.direction = info.Direction !== '-' ? info.Direction : '';
		this.address = [info.BuildingName, info.HouseNo].join('');
		this.sellprice = info.SellPrice || '0';
		this.rentprice = info.RentalPrice || '0';
		this.allphotos = [];
		this.stylePhotos = [];
		this.roomPhotos = [];
		this.photos = this.getAllPhotos(info.Photos);
		this.groupPhotos(this.getPhotos(info.Photos));
		this.status = DETAIL_STATUS_INIT;
		this.valid = info.PropertyStatusName === "有效";
		this.roomListWidth = 0;
		this.styleListWidth = 0;
		this.viewPhoto = {};
		this.showView = false;
		this.taboo = Config.taboo.split(",");
		this.maxSelect = 0;
		this.restSelect = 0;
		this.selectPhotoCache = [];
	}

	reset() {
		this.setInfo({});
	}

	containTaboo(description) {
		if (!this.taboo) {
			return;
		}
		let len = this.taboo.length;
		for (let i = 0; i < len; i++) {
			let taboo = this.taboo[i];
			if (description.indexOf(taboo) != -1) {
				return taboo;
			}
		}
	}

	setDefault(type, url) {
		this.resetDefault();
		switch (type) {
			case PHTOTO_TYPE_ROOM:
				this.roomPhotos.forEach((item, index) => {
					if (item.url == url) {
						item.isdefault = true;
						this.roomPhotos.splice(index, 1);
						this.roomPhotos.unshift(item);
					}
				});
				break;
			case PHTOTO_TYPE_STYLE:
				this.stylePhotos.forEach((item, index) => {
					if (item.url == url) {
						item.isdefault = true;
						this.stylePhotos.splice(index, 1);
						this.stylePhotos.unshift(item);
					}
				});
				break;
		}
	}

	resetDefault() {
		this.roomPhotos.forEach((item, index) => {
			item.isdefault = false;
		});
		this.stylePhotos.forEach((item, index) => {
			item.isdefault = false;
		});
	}

	getAllPhotos(photos = []) {
		return photos.map((photo, index) => {
			photo = new Photo(Object.assign(photo, {
				houseid: this.houseid,
				adid: this.adid
			}));
			return photo;
		})
	}

	getPhotos(photos = []) {
		let retPhotos = photos.map((photo, index) => {
			photo = new Photo(Object.assign(photo, {
				houseid: this.houseid,
				adid: this.adid
			}));
			return photo;
		}).sort((prev, next) => {
			return parseInt(prev.seq) - parseInt(next.seq);
		});
		retPhotos.map((item, index) => {
			if (item.isdefault) {
				retPhotos.splice(index, 1);
				retPhotos.unshift(item);
			}
		});
		return retPhotos;
	}

	groupPhotos(photos = []) {
		let t = this;
		photos.map((photo, index) => {
			if (photo.type === PHTOTO_TYPE_ROOM) {
				t.roomPhotos.push(photo);
			} else if (photo.type === PHTOTO_TYPE_STYLE) {
				t.stylePhotos.push(photo);
			}
		});
	}

	addPhoto(photo) {
		var t = this;
		switch (photo.type) {
			case PHTOTO_TYPE_ROOM:
				t.roomPhotos.push(photo);
				break;
			case PHTOTO_TYPE_STYLE:
				t.stylePhotos.push(photo);
				break;
		}
	}

	deletePhoto(photo) {
		var t = this;
		switch (photo.type) {
			case PHTOTO_TYPE_ROOM:
				t.roomPhotos.forEach((item, index) => {
					if (photo.url == item.url) {
						t.roomPhotos.splice(index, 1);
					}
				});
				break;
			case PHTOTO_TYPE_STYLE:
				t.stylePhotos.forEach((item, index) => {
					if (item.url == photo.url) {
						t.stylePhotos.splice(index, 1);
					}
				});
				break;
		}
	}

	addSelectPhotos(type) {
		var t = this;
		t.selectPhotoCache.forEach((photo, index) => {
			let sameOldPhotos = t.photos.filter((item, index) => {
				return item.type === photo.type && item.url == photo.url;
			});
			if (sameOldPhotos && sameOldPhotos[0]) {
				photo.seq = sameOldPhotos[0].seq;
			}
			t.addPhoto(photo);
		});
		t.selectPhotoCache = [];
	}

	removeSelectPhotos() {
		this.selectPhotoCache = [];
	}

	removeAllPhotos() {
		this.allphotos = [];
	}

	deleteSelectPhoto(photo) {
		var t = this;
		t.selectPhotoCache.forEach((item, index) => {
			if (item.url == photo.url) {
				t.selectPhotoCache.splice(index, 1);
			}
		});
	}

	selectPhoto(type, url, checked) {
		var t = this;
		t.allphotos.forEach((photo, index) => {
			if (type === photo.type && url == photo.url) {
				photo.checked = checked;
				if (photo.checked) {
					t.selectPhotoCache.push(photo);
				} else {
					t.deleteSelectPhoto(photo);
				}
			}
		});
	}

	getPhotosByType(type) {
		switch (type) {
			case PHTOTO_TYPE_ROOM:
				return this.roomPhotos;
			case PHTOTO_TYPE_STYLE:
				return this.stylePhotos;
		}
	}

	setHousePhotos(type, photos) {
		let allphotos = this.getPhotos(photos);
		switch (type) {
			case PHTOTO_TYPE_ROOM:
				this.allphotos = allphotos.filter((item, index) => {
					return !this.roomPhotos.some((photo, index) => {
						return photo.type === item.type && photo.url == item.url;
					});
				});
				break;
			case PHTOTO_TYPE_STYLE:
				this.allphotos = allphotos.filter((item, index) => {
					return !this.stylePhotos.some((photo, index) => {
						return photo.type === item.type && photo.url == item.url;
					});
				});
				break;
		}
	}

	getEditInfo(status) {
		let ret = {};
		ret.KeyId = this.adid;
		ret.RenovationkeyId = '';
		ret.DirectionKeyId = '';
		ret.TitlePrefix = '';
		ret.PrivatePrice = '';
		ret.PhotoPath = '';
		ret.PhotoType = '';
		ret.IsDefault = '';
		ret.PropertyKeyId = this.houseid;
		ret.AdNo = this.adno;
		ret.TradeType = this.tradetype;
		ret.Title = this.title;
		ret.Description = this.description;
		ret.Status = status;
		ret.Photos = this.getSelectedPhotos();
		ret.AdvertKeyWord = '';
		ret.PriceAdvantage = '';
		ret.OtherHighlights = '';
		ret.RentalReason = '';
		return ret;
	}
	getSelectedPhotos() {
		let photos = this.mergePhotos(this.roomPhotos, this.stylePhotos);
		let retPhotos = photos.map((photo, index) => {
			let photoData = {};
			photoData.KeyId = photo.keyid;
			photoData.PostId = photo.adid;
			photoData.PhotoPath = photo.url;
			photoData.photoType = photo.type === 1 ? "户型图" : photo.type === 2 ? "室内图" : "";
			photoData.isDefault = photo.isdefault;
			photoData.Seq = index;
			return photoData;
		});
		console.log(retPhotos);
		return retPhotos;
	}

	mergePhotos(rPhotos, sPhotos) {
		if (!rPhotos || !sPhotos) {
			return;
		}
		let roomPhotos = [...rPhotos];
		let stylePhotos = [...sPhotos];
		let photos = [];
		let len = roomPhotos.length;
		for (let i = len - 1; i >= 0; i--) {
			if (roomPhotos[i].seq != -1) {
				let item = roomPhotos[i];
				photos[item.seq] = roomPhotos.splice(i, 1)[0];
			}
		}
		len = stylePhotos.length;
		for (let i = len - 1; i >= 0; i--) {
			if (stylePhotos[i].seq != -1) {
				let item = stylePhotos[i];
				photos[item.seq] = stylePhotos.splice(i, 1)[0];
			}
		}
		photos.sort((prev, next) => {
			return prev.seq - next.seq;
		});
		len = photos.length;
		let defaultPhoto;
		for (let i = len - 1; i >= 0; i--) {
			if (!photos[i]) {
				photos.splice(i, 1);
			} else if (photos[i].isdefault) {
				defaultPhoto = photos.splice(i, 1)[0];
			}
		}
		if (defaultPhoto) {
			photos.unshift(defaultPhoto);
		}
		let ret = photos.concat(roomPhotos).concat(stylePhotos);
		return ret;
	}
}

class PhotoGroup {
	constructor(keyid, adid, houseid, type, photos) {
		this.keyid = keyid;
		this.adid = adid;
		this.houseid = houseid;
		this.type = type;
		this.photos = photos;
	}
}

class Photo {
	constructor(photo) {
		this.adid = photo.adid;
		this.houseid = photo.houseid;
		this.keyid = photo.KeyId;
		this.type = photo.ImgClassId;
		this.url = photo.ImgPath || photo.PhotoPath || '../../images/preview.png';
		this.isdefault = photo.IsDefault || false;
		this.desription = photo.ImgDescription || '';
		this.createtime = photo.CreateTime || '';
		this.checked = photo.checked || false;
		this.seq = photo.Seq || -1;
	}
}

export default AdDetail;