__customIndicators = [
  {   
      name: "KDJ",
      metainfo: {
          "_metainfoVersion": 40,
          "id": "KDJ@tv-basicstudies-1",
          "scriptIdPart": "",
          "name": "KDJ",
          "description": "KDJ",
          "shortDescription": "KDJ",
          "is_hidden_study": true,
          "is_price_study": false,
          "isCustomIndicator": true,
          "plots": [
            {"id": "plot_0", "type": "line"},
            {"id": "plot_1", "type": "line"},
            {"id": "plot_2", "type": "line"}
          ],
          "defaults": {
              "styles": {
                  "plot_0": {
                      "linestyle": 0,
                      "visible": true,
                      "linewidth": 1,
                      "plottype": 2,
                      "trackPrice": false,
                      "transparency": 0,
                      "color": "#DDDDDD" // 变
                  },
                  "plot_1": {
                      "linestyle": 0,
                      "visible": true,
                      "linewidth": 1,
                      "plottype": 2,
                      "trackPrice": false,
                      "transparency": 0,
                      "color": "#DED645" // 黄
                  },
                  "plot_2": {
                  "linestyle": 0,
                  "visible": true,
                  "linewidth": 1,
                  "plottype": 2,
                  "trackPrice": false,
                  "transparency": 0,
                  "color": "#DE45BF" // 紫
              },
              },
              "precision": 4,
              "inputs": {
                plot_0: 9,
                plot_1: 3,
                plot_2: 3,
              }
          },
          "styles": {
              "plot_0": {
                  "title": "K",
                  "histogramBase": 0,
                  "plottype": 2
              },
              "plot_1": {
                  "title": "D",
                  "histogramBase": 0,
                  "plottype": 2
              },
              "plot_2": {
                  "title": "J",
                  "histogramBase": 1,
                  "plottype": 2
              }
          },
        "inputs": [
          {
            id: "plot_0",
            name: "Calculating Period",
            type: "integer",
            min: 1,
            max: 2e3
          }, {
            id: "plot_1",
            name: "MA Period 1",
            type: "integer",
            min: 1,
            max: 2e3
          }, {
            id: "plot_2",
            name: "MA Period 2",
            type: "integer",
            min: 1,
            max: 2e3
          }
        ]
      },
      constructor: function() {
          this.init = function(context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              var symbol = PineJS.Std.ticker(this._context);
              this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
          };
          this.main = function(context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              var period = this._input(0);
              var ma1 = this._input(1);
              var ma2 = this._input(2);
              // 当前close值
              var c = PineJS.Std.close(this._context);
              // 当前high值
              var high = PineJS.Std.high(this._context);
              // 当前low值
              var low = PineJS.Std.low(this._context);
              // 这个阶段最高值
              var h_var=this._context.new_var(high)
              var h = PineJS.Std.highest(h_var,period,this._context);
              // 这个阶段最低值
              var l_var = this._context.new_var(low)
              var l = PineJS.Std.lowest(l_var,period,this._context);
              var RSV = 100*((c-l)/(h-l))
              var RSV_var = this._context.new_var(RSV)
              var pK = PineJS.Std.rma(RSV_var,ma1,this._context);
              var pk_var = this._context.new_var(pK)
              var pD = PineJS.Std.rma(pk_var,ma2,this._context);
              var pJ = 3*pK - 2 *pD
              return [pK,pD,pJ];
          }
      }
  },
  {   
      name: "GATEIO_MACD",
      metainfo: {
          "_metainfoVersion": 40,
          "id": "GATEIO_MACD@tv-basicstudies-1",
          "scriptIdPart": "",
          "name": "GATEIO_MACD",
          "description": "GATEIO_MACD",
          "shortDescription": "MACD",
          "is_hidden_study": true,
          "is_price_study": false,
          "isCustomIndicator": true,
          "plots": [
            {"id": "plot_0", "type": "line"},
            {"id": "plot_1", "type": "line"},
            {"id": "plot_2", "type": "line"},
            {
              id: "volumePalette",
              palette: "volumePalette",
              target: "plot_0",
              type: "colorer"
            }
          ],
          defaults: {
            styles: {
              plot_0: {
                "linestyle": 0,
                "visible": true,
                "linewidth": 1,
                "plottype": 5,
                "trackPrice": false,
                "transparency": 30 // 白
              },
              plot_1: {
                "linestyle": 0,
                "visible": true,
                "linewidth": 1,
                "plottype": 2,
                "trackPrice": false,
                "transparency": 0,
                "color": "#dddddd" // 白 变  2DCCAC
              },
              plot_2: {
                "linestyle": 0,
                "visible": true,
                "linewidth": 1,
                "plottype": 2,
                "trackPrice": false,
                "transparency": 0,
                "color": "#ded645" // 黄
              }
            },
              "precision": 4,
              "inputs": {
                in_0: 12,
                in_1: 26,
                in_3: "close",
                in_2: 9
              },
              palettes: {
                volumePalette: {
                  colors: {
                    0: {
                      color: "#00b32b",//   大绿      绿  #31A853
                      width: 1,
                      style: 0
                    },
                    1: {
                      color: "#bd000d",//   大红      绿2  #DFF7E6
                      width: 1,
                      style: 0
                    },
                    2: {
                      color: "#00b32b",//   大绿      红  #FF5C33
                      width: 1,
                      style: 0
                    },
                    3: {
                      color: "#bd000d",//  大红       红2 #FCE0E0
                      width: 1,
                      style: 0
                    }
                  }
                }
              }
          },
          "styles": {
              "plot_0": {
                  "title": "Histogram",
                  "histogramBase": 0,
              },
              "plot_1": {
                "title": "MACD",
                "histogramBase": 0,
              },
              "plot_2": {
                "title": "Signal",
                "histogramBase": 1,
              }
          },
          "inputs": [
            {
              id: "in_0",
              name: "fastLength",
              type: "integer",
              min: 1,
              max: 2e3
            }, {
              id: "in_1",
              name: "slowLength",
              type: "integer",
              min: 1,
              max: 2e3
            }, {
              id: "in_3",
              name: "Source",
              defval: "close",
              type: "source",
              options: ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4"]
            }, {
              id: "in_2",
              name: "signalLength",
              type: "integer",
              min: 1,
              max: 50
            }
          ],
          palettes: {
            volumePalette: {
              colors: {
                0: {
                  name: "Color 0"
                },
                1: {
                  name: "Color 1"
                },
                2: {
                  name: "Color 2"
                },
                3: {
                  name: "Color 3"
                }
              }
            }
          }
      },
      
      constructor: function() {
          this.init = function(context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              var symbol = PineJS.Std.ticker(this._context);
              this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
          };
          this.beforeValue = 0
          this.nodeValue = 0
          this.beforeTime = 0
          this.roseIndex = 3
          this.fallIndex = 1
          this.f_0 = function(t, e) {
              return t - e
          }
          this.main = function(context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              var i = PineJS.Std[this._input(2)](this._context);
              var n = this._input(0);
              var r = this._input(1);
              var s = this._input(3);
              var f, m, g;
              if (!isNaN(i)) {
                // 快线长度
                var a = this._context.new_var(i);
                var l = PineJS.Std.ema(a, n, this._context);
                // 慢线长度
                var c = this._context.new_var(i);
                var h = PineJS.Std.ema(c, r, this._context);
                // 信号长度
                var u = this.f_0(l, h);
                var d = this._context.new_var(u);
                var p = PineJS.Std.ema(d, s, this._context);
                
                var _ = this.f_0(u, p);
                f = _;
                m = u;
                g = p
                
                if (typeof a.symbol !== "undefined" && typeof a.symbol.time !== "undefined") {
                  if (this.beforeTime < a.symbol.time) {
                    this.nodeValue = this.beforeValue
                  }
                }
                
                // 红还是绿
                  var z = f > 0 ? 1 : 0
                  var colorValue = 0
                  // 涨 红
                  if (z) {
                  if (f < this.nodeValue) {
                      colorValue = 2 // - 大红
                      this.roseIndex = 2 
                  } else if(f > this.nodeValue){
                      colorValue = 3 // + 浅红
                      this.roseIndex = 3
                  } else {
                      colorValue = this.roseIndex
                  }
                  
                  }else { // 跌 绿
                  if (f < this.nodeValue) {
                      colorValue = 0 
                      this.fallIndex = 0
                  } else if(f > this.nodeValue){
                      colorValue = 1
                      this.fallIndex = 1
                  } else {
                      colorValue = this.fallIndex
                  }
                  }
                  this.beforeValue = f
                  this.beforeTime  = a.symbol.time
              }

            return [f,m,g,colorValue];
          }
      }
  },
  {   
      name: "TD Sequential",
      metainfo: {
          _metainfoVersion: 40,
          isTVScript: false,
          isTVScriptStub: false,
          description: "TD Sequential",
          shortDescription: "TD Sequential",
          is_hidden_study: true,
          is_price_study: true,
          id: "TD Sequential@tv-basicstudies-1",
          scriptIdPart: "",
          name: "TD Sequential",
          isCustomIndicator: true,
          plots: [{
              id: "plot_0",
              type: "shapes"
              }, {
                  id: "plot_1",
                  type: "shapes"
              }, {
                  id: "plot_2",
                  type: "shapes"
              },{
                  id: "plot_3",
                  type: "shapes"
              }, {
                  id: "plot_4",
                  type: "shapes"
              }, {
                  id: "plot_5",
                  type: "shapes"
              },{
                id: "plot_6",
                type: "shapes"
              }, {
                  id: "plot_7",
                  type: "shapes"
              }, {
                  id: "plot_8",
                  type: "shapes"
              },

              {
                id: "plot_9",
                type: "shapes"
                }, {
                    id: "plot_10",
                    type: "shapes"
                }, {
                    id: "plot_11",
                    type: "shapes"
                },{
                    id: "plot_12",
                    type: "shapes"
                }, {
                    id: "plot_13",
                    type: "shapes"
                }, {
                    id: "plot_14",
                    type: "shapes"
                },{
                  id: "plot_15",
                  type: "shapes"
                }, {
                    id: "plot_16",
                    type: "shapes"
                }, {
                    id: "plot_17",
                    type: "shapes"
                }, {
                    id: "plot_18",
                    type: "shapes"
                }, {
                    id: "plot_19",
                    type: "shapes"
                }
          ],
          defaults: {
              styles: {
                  plot_0: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "1"
                  },
                  plot_1: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "2"
                  },
                  plot_2: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "3"
                  },
                  plot_3: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "4"
                  },
                  plot_4: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "5"
                  },
                  plot_5: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "6"
                  },
                  plot_6: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "7"
                  },
                  plot_7: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF6347",
                      text: "8"
                  },
                  plot_8: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF00FF",
                      text: "9"
                  },


                  plot_9: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "1"
                  },
                  plot_10: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "2"
                  },
                  plot_11: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "3"
                  },
                  plot_12: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "4"
                  },
                  plot_13: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "5"
                  },
                  plot_14: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "6"
                  },
                  plot_15: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "7"
                  },
                  plot_16: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#008000",
                      text: "8"
                  },
                  plot_17: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#00FFFF",
                      text: "9"
                  },

                  plot_18: {
                      plottype: "shape_triangle_down",
                      visible: !0,
                      location: "AboveBar",
                      transparency: 0,
                      color: "#FF00FF",
                      text: "13"
                  },
                  plot_19: {
                      plottype: "shape_triangle_up",
                      visible: !0,
                      location: "BelowBar",
                      transparency: 0,
                      color: "#00FFFF",
                      text: "13"
                  }
              },
              precision: 1,
              inputs: {
                  '仅显示9和13': 0
              }
          },

          styles: {
              plot_0: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_1: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_2: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_3: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_4: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_5: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_6: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_7: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_8: {
                  title: "Down fractals",
                  isHidden: !1
              },


              plot_9: {
                title: "Up fractals",
                isHidden: !1
              },
              plot_10: {
                  title: "Up fractals",
                  isHidden: !1
              },
              plot_11: {
                title: "Up fractals",
                isHidden: !1
              },
              plot_12: {
                  title: "Up fractals",
                  isHidden: !1
              },
              plot_13: {
                title: "Up fractals",
                isHidden: !1
              },
              plot_14: {
                  title: "Up fractals",
                  isHidden: !1
              },
              plot_15: {
                title: "Up fractals",
                isHidden: !1
              },
              plot_16: {
                  title: "Up fractals",
                  isHidden: !1
              },
              plot_17: {
                title: "Up fractals",
                isHidden: !1
              },


              plot_18: {
                  title: "Down fractals",
                  isHidden: !1
              },
              plot_19: {
                title: "Up fractals",
                isHidden: !1
              }
          },
          
          inputs: [{
              id: "仅显示9和13",
              name: "仅显示9和13",
              defval: !1,
              type: "bool"
          }]
          
      },
      constructor: function() {
          this.init = function(context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              var symbol = PineJS.Std.ticker(this._context);
              this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
          };
          
         this.TD = 0
         this.TD_var = null;

         this.TS = 0
         this.TS_var = null;
          
         this.onTD = 0
         this.onTS = 0
          
          this.main = function(t, e) {
              this._context = t, this._input = e;

              var isShow9and13 = this._input(0)
              
              // 当前close值
              var c = PineJS.Std.close(this._context);
              // 当前close对象
              var c_var = this._context.new_var(c)
              
              if (c > c_var.get(4)) { 
                if (this.TD_var) {
                  this.TD = PineJS.Std.nz(this.TD_var.get(1)) + 1
                } else {
                  this.TD = 1
                }
              } else {
                this.TD = 0
              }
              this.TD_var = this._context.new_var(this.TD)
              
              
              if (c < c_var.get(4)) {
                if (this.TS_var) {
                  this.TS = PineJS.Std.nz(this.TS_var.get(1)) + 1
                } else {
                  this.TS = 1
                }
              } else {
                this.TS = 0
              }
              this.TS_var = this._context.new_var(this.TS)
              
              var TDUp = 0
              // ping valuewhen 方法实现思路
              if (this.TD < this.TD_var.get(1)) {
                this.onTD = this.TD
                TDUp = this.TD - this.TD
              } else {
                TDUp = this.TD - this.onTD
              }
              
              var TDDn = 0
              if (this.TS < this.TS_var.get(1)) {
                this.onTS = this.TS
                TDDn = this.TS - this.TS
              } else {
                TDDn = this.TS - this.onTS
              }
              
              // console.log("TDUp:",TDUp)
              // console.log("TDDn:",TDDn)

              if (isShow9and13) {
                if (TDUp !== 9 && TDUp !== 13) {
                  TDUp = 0
                }
                if (TDDn !== 9 && TDDn !== 13) {
                  TDDn = 0
                }
              }

              
              return [{
                        value: TDUp == 1 ? 1 : 0
                      }, 
                      {
                        value: TDUp == 2 ? 1 : 0
                      },
                      {
                        value: TDUp == 3 ? 1 : 0
                      }, 
                      {
                        value: TDUp == 4 ? 1 : 0
                      },
                      {
                        value: TDUp == 5 ? 1 : 0
                      }, 
                      {
                        value: TDUp == 6 ? 1 : 0
                      },
                      {
                        value: TDUp == 7 ? 1 : 0
                      }, 
                      {
                        value: TDUp == 8 ? 1 : 0
                      },
                      {
                        value: TDUp == 9 ? 1 : 0
                      },

                      
                      {
                        value: TDDn == 1 ? 1 : 0
                      }, 
                      {
                        value: TDDn == 2 ? 1 : 0
                      },
                      {
                        value: TDDn == 3 ? 1 : 0
                      }, 
                      {
                        value: TDDn == 4 ? 1 : 0
                      },
                      {
                        value: TDDn == 5 ? 1 : 0
                      }, 
                      {
                        value: TDDn == 6 ? 1 : 0
                      },
                      {
                        value: TDDn == 7 ? 1 : 0
                      }, 
                      {
                        value: TDDn == 8 ? 1 : 0
                      },
                      {
                        value: TDDn == 9 ? 1 : 0
                      },
                      


                      {
                        value: TDUp == 13 ? 1 : 0
                      },
                      {
                        value: TDDn == 13 ? 1 : 0
                      }

              ]
              
          }
          
      }
  }
]