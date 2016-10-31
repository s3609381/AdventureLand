// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true

setInterval(function(){

	//stops wasting so many health pots
	
	//Check if health pot is needed and use it
	useHealthPot()
	//Check if mana pot is needed and use it
	useManaPot()
	
	//scan for lootboxes on the screen and loot them
	loot();

	if(!attack_mode || character.moving) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	
	
	if(!in_attack_range(target))
	{
		move(
			character.real_x+(target.real_x-character.real_x)/2,
			character.real_y+(target.real_y-character.real_y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.

// **********************
//FUNCTION LIBRARY
// **********************

function useHealthPot() 
{
	if (character.hp < (character.max_hp * 0.4))
	{
		set_message("Using Health Potion");
		parent.use('hp');
	}	
}

function useManaPot()
{
    //Check if mana pot is needed and use it    
	if (character.mp < (character.max_mp * 0.4))
		{
			set_message("Using Mana Potion");
			parent.use('mp');
		}
}	
