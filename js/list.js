/**
 * @author Mutaz Musa
 */

function ShowGraph(id)
{
	if(id=='none') $('#quizgraph').attr('src', 'img/graphs/none.png');
	else $('#quizgraph').attr('src', 'img/graphs/'+id+'.png');
	$('#quizgraph').fadeIn('slow');
} 