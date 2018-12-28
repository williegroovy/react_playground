/*
* Bridge Pattern - Takes the adapter pattern to a new level. Given an interface,
* we can build multiple adapters, each of which acts as an intermediary to a different implementation.
*
*  Great use is dealing with two different services that provide more or less the same functionality
*  and are used in a failover configuration. Neither service provides exactly the interface required by
*  the application and both service provide different APIs. In order to simplify the code, adapters are
*  written to provide a consistent interface. The adapters implement a consistent interface and provide
*  fills so that each API can be called consistently.
*
*  Going back to the round peg / square hole... each adapter fills in the missing bits to help us get a good fit.
 */

/*
* *** --> Diagram <-- ***
*
*             [DesiredInterface]
*                 (-DoABandC)
*                  |    |
*           --------     ---------------
*         |                             |
*         |                             |
*         |                             |
*     [Adapter1]                   [Adapter 2]
*     (-DoABandC)                  (-DoABandC)
*         |                             |
*         |                             |
*         |                             |
*  [Implementation1]             [Implementation2]
*   (-DoAB | -DoC)              (-DoA | -DoB | -DoC)
*
*
*/

const OldGods = (function() {
  function OldGods() {
    this.name = 'Old Gods';
  }

  OldGods.prototype.prayTo = function(sacrifice) {
    console.log(`We ${this.name} hear your prayer!`);
  };

  return OldGods;
})();

const DrownedGod = (function() {
  function DrownedGod() {
    this.name = 'Drowned God';
  }

  DrownedGod.prototype.prayTo = function(humanSacrifice) {
    console.log(`${this.name} *BUBBLE GURGLE`)
  };

  return DrownedGod;
})();

const SevenGods = (function() {
  function SevenGods() {
    this.name = 'Seven Gods';
  }

  SevenGods.prototype.prayTo = function(sacrifice) {
    console.log(`Sorry there are a lot of us. ${this.name}... it gets confusing?`);
  };

  return SevenGods;
})();

const Sacrifice = function() {};
const HumanSacrifice = function() {};
const PrayerPurposeProvider = (function() {
  function PrayerPurposeProvider() {
    this.prayerPurpose = 'Prayer Purpose';
  }

  PrayerPurposeProvider.prototype.getPurpose = function() {
    return this.prayerPurpose;
  };

  return PrayerPurposeProvider;
})();


const OldGodsAdapter = (function() {
  function OldGodsAdapter() {
    this.oldGods = new OldGods();
  }

  OldGodsAdapter.prototype.prayTo = function() {
    let sacrifice = new Sacrifice();
    this.oldGods.prayTo(sacrifice);
  };

  return OldGodsAdapter;
})();

class DrownedGodAdapter {
  constructor() {
    this._drownedGod = new DrownedGod();
  }

  prayTo() {
    const sacrifice = new HumanSacrifice();
    this._drownedGod.prayTo(sacrifice);
  }
}

const SevenGodsAdapter = (function() {
  function SevenGodsAdapter() {
    this.prayerPurposeProvider = new PrayerPurposeProvider();
    this._sevenGods = new SevenGods();
  }

  SevenGodsAdapter.prototype.prayTo = function() {
    this._sevenGods.prayTo(this.prayerPurposeProvider.getPurpose());
  };

  return SevenGodsAdapter;
})();

const Religion = {};
Religion.OldGods = OldGods;
Religion.DrownedGod = DrownedGod;
Religion.SevenGods = SevenGods;
Religion.OldGodsAdapter = OldGodsAdapter;
Religion.DrownedGodAdapter = DrownedGodAdapter;
Religion.SevenGodsAdapter = SevenGodsAdapter;
Religion.PrayerPurposeProvider = PrayerPurposeProvider;

const god1 = new Religion.SevenGodsAdapter();
const god2 = new Religion.DrownedGodAdapter();
const god3 = new Religion.OldGodsAdapter();

const gods = [god1, god2, god3];

gods.forEach(curr => curr.prayTo());
